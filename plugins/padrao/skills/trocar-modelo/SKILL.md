---
name: trocar-modelo
description: Usar ao sugerir troca de modelo ou de esforço — quando o próximo passo pede outro nível (mais simples ou mais difícil) ou ao montar um plano em passos. Traz a tabela de nota × custo e diz como sugerir pelo nome que o menu da pessoa mostra.
---

# Trocar de modelo ou de esforço

Os papéis ("o que decide", "o que executa", "o leve"; esforço "pouco",
"normal", "o máximo") estão em "Modelo e esforço", no `padrao.md`.

## A tabela

Ler `~/source/repos/claude-padrao/regras/modelos.md`: nota × custo por modelo
e esforço, com a data da pesquisa e a fronteira marcada. Uma rotina semanal a
reescreve. Se a data passou de 14 dias, dizer que está velha, uma vez por
sessão, ao sugerir a troca. Sem o arquivo, perguntar à pessoa antes de
sugerir.

## Como escolher

- **A maior nota pelo menor custo para a tarefa.** Julgar o nível que a
  tarefa exige, dizer esse nível em uma linha, e escolher na fronteira a opção
  mais barata que o atende, entre o que o menu da pessoa tem. Opção dominada
  (outra dá nota ≥ por custo ≤) não se sugere.
- **O Claude não vê o plano da pessoa.** A sessão diz qual modelo ele é, não
  quais aparecem no menu dela. Se o arquivo pessoal ou a memória não disserem,
  perguntar quais modelos e níveis de esforço o menu mostra e guardar a
  resposta na memória. Se ela disser que o nome sugerido não existe (modelo
  novo, plano mudou), perguntar de novo e atualizar.
- **Traduzir o papel para os nomes exatos do menu**, o modelo e o nível de
  esforço como aparecem lá, mesmo quando o nível é o padrão (o padrão muda de
  um modelo para outro). Nunca só "um modelo menor": a pessoa precisa saber o
  que clicar.

## Quando e como

- **Na fronteira da sessão, nunca no meio.** O cache é por modelo, e trocar
  no meio paga a conversa inteira de novo. Com a ferramenta de sessões, a
  troca é uma sessão filha (skill `padrao:sessao-filha`). Sem ela: arquivo de
  contexto → mensagem de entrega com o modelo e o esforço sugeridos →
  `/clear` → menu → a sessão nova lê o arquivo de contexto (skill
  `padrao:fechar-sessao`). Modelo de janela menor, só depois do `/clear`.
- **Avisar nos dois sentidos, só quando o passo muda:** baixar quando a
  próxima tarefa é simples, subir quando a simples acabou e a próxima pede
  decisão. Nunca a cada resposta: aviso repetido ensina a ignorar.
- **Plano em passos:** cada passo sai com o modelo e o esforço dele, no plano
  e no arquivo de contexto. Ao entrar num passo cuja indicação difere da
  sessão atual, pedir a troca no fim da mensagem, com botões: "Parar aqui e
  trocar para X · esforço Y" ou "Continuar como está". Onde não houver
  botões, uma linha em negrito e as duas opções numeradas.
- **O passo no arquivo de contexto traz o que o leve precisa** para seguir
  sem a conversa: o arquivo, o método, o que fica pronto no fim, e o que não é
  dele decidir (aí ele para e pede o que decide).
