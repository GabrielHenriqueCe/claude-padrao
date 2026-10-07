// Hook UserPromptSubmit: diz ao Claude quanto da janela de contexto já foi usado.
//
// O Claude não vê esse número: o que chega até ele é o saldo de tokens da sessão, e conta
// feita sobre o saldo erra. Este hook lê o transcript, pega o uso da última resposta e, a
// partir de 50%, injeta o número na conversa. A regra "Contexto cheio" do padrao.md diz o
// que fazer com ele.
//
// A janela não vem na entrada do hook, então sai do modelo da última resposta, que cada
// sessão grava no próprio transcript. Trocar de modelo no meio da sessão já muda a conta na
// resposta seguinte. Janelas da documentação de modelos (09/2026): Haiku e Opus/Sonnet até a
// 4.5 têm 200k; Opus/Sonnet 4.6 em diante e Fable têm 1M. Modelo desconhecido conta como
// novo (1M). Janela diferente dessas: CLAUDE_CONTEXTO_JANELA (em tokens). O aviso mostra a
// janela usada, para o erro aparecer.

'use strict';

const fs = require('fs');

const AMARELA = 50;
const VERMELHA = 75;
// Só o fim do transcript: a última resposta está lá, e o arquivo inteiro passa de MB.
const BYTES_DO_FIM = 2 * 1024 * 1024;

function lerFim(caminho) {
    const tamanho = fs.statSync(caminho).size;
    const inicio = Math.max(0, tamanho - BYTES_DO_FIM);
    const buffer = Buffer.alloc(tamanho - inicio);
    const arquivo = fs.openSync(caminho, 'r');
    try {
        fs.readSync(arquivo, buffer, 0, buffer.length, inicio);
    } finally {
        fs.closeSync(arquivo);
    }
    return buffer.toString('utf8');
}

// A última resposta da conversa principal. Pula a de subagente (isSidechain) e a sintética,
// que o Claude Code grava com usage zerado quando a API falha ou a resposta é cancelada.
function ultimaResposta(texto) {
    const linhas = texto.split('\n');
    for (let i = linhas.length - 1; i >= 0; i--) {
        // O texto só filtra; quem decide é o tipo da entrada, porque a conversa pode
        // citar "compact_boundary" ou "assistant" sem ser uma.
        if (!linhas[i].includes('"compact_boundary"') && !linhas[i].includes('"assistant"')) continue;
        try {
            const entrada = JSON.parse(linhas[i]);
            // Houve resumo depois da última resposta: o uso dela é de antes e não vale mais.
            if (entrada.type === 'system' && entrada.subtype === 'compact_boundary') return null;
            if (entrada.type === 'assistant' && !entrada.isSidechain
                && entrada.message?.usage && entrada.message.model !== '<synthetic>') {
                return entrada.message;
            }
        } catch { /* a primeira linha do corte vem pela metade */ }
    }
    return null;
}

function janelaDo(modelo) {
    const definida = Number(process.env.CLAUDE_CONTEXTO_JANELA);
    if (definida > 0) return definida;
    const nome = (modelo || '').toLowerCase();
    if (nome.includes('haiku') || nome.startsWith('claude-3')) return 200_000;
    // Versão do Opus/Sonnet. O menor só tem 1 ou 2 dígitos, para a data de
    // "claude-opus-4-20250514" não ser lida como versão 4.20250514.
    const versao = nome.match(/(?:opus|sonnet)-(\d+)(?:-(\d{1,2}))?(?!\d)/);
    if (versao) {
        const maior = Number(versao[1]);
        const menor = Number(versao[2] || 0);
        if (maior < 4 || (maior === 4 && menor < 6)) return 200_000;
    }
    return 1_000_000;
}

const rotulo = (janela) => (janela >= 1_000_000 ? `${janela / 1_000_000}M` : `${Math.round(janela / 1000)}k`);

function main() {
    const entrada = JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
    if (!entrada.transcript_path || !fs.existsSync(entrada.transcript_path)) return;

    const resposta = ultimaResposta(lerFim(entrada.transcript_path));
    if (!resposta) return;

    const uso = resposta.usage;
    const usados = (uso.input_tokens || 0) + (uso.cache_read_input_tokens || 0)
                 + (uso.cache_creation_input_tokens || 0) + (uso.output_tokens || 0);
    const janela = janelaDo(resposta.model);
    const porcentagem = Math.round((usados / janela) * 100);
    if (porcentagem < AMARELA) return;

    const fase = porcentagem >= VERMELHA ? 'vermelha' : 'amarela';
    const aviso = `Contexto em ${porcentagem}% da janela de ${rotulo(janela)} `
                + `(fase ${fase}). Seguir a regra "Contexto cheio" do padrao.md.`;

    process.stdout.write(JSON.stringify({
        hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: aviso },
    }));
}

// Hook nunca derruba a mensagem da pessoa: qualquer erro, sai calado.
try { main(); } catch { /* sem aviso desta vez */ }
