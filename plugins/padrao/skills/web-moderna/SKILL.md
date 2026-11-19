---
name: web-moderna
description: Usar ao planejar ou escrever HTML, CSS ou JS de tela — modal, popover, formulário, validação, tabela, tema escuro, animação, layout responsivo, imagem, acessibilidade, desempenho (LCP, INP, CLS), segurança no navegador. Busca no Modern Web Guidance (Chrome, Edge e Firefox) o jeito atual de fazer, antes de escrever de memória. Não usar para back-end, banco, CI ou configuração de ferramenta.
---

# Web moderna

O que o modelo sabe de web envelhece: ele tende a escrever o padrão de anos
atrás (modal com `div` e JS, foco na mão). O **Modern Web Guidance** é o guia
mantido pelos times do Chrome, do Edge e do Firefox, com o suporte de cada
recurso nos navegadores (Baseline). Consultar **antes** de escrever, no plano
ou no código.

## Como chamar

Sempre com a versão fixa e a telemetria desligada:

```sh
DISABLE_TELEMETRY=1 npx -y modern-web-guidance@1.0.1 search "<consulta>"
DISABLE_TELEMETRY=1 npx -y modern-web-guidance@1.0.1 retrieve "<id>,<id>"
```

- **Versão fixa:** o pacote traz os guias dentro, então a versão fixa é o
  conteúdo revisado. Nunca `@latest`: o que roda passaria a ser o que ninguém
  leu.
- **Telemetria desligada:** sem a variável, a consulta vai para o Google.
- No PowerShell: `$env:DISABLE_TELEMETRY='1'; npx.cmd -y modern-web-guidance@1.0.1 ...`

## Passos

1. **Buscar** com 2 a 5 palavras em inglês, um recurso por busca, sem nome
   de framework nem do projeto: `"light dismiss dialog"`, `"responsive data
   table"`. Pedido que não nomeia o componente vira o componente: "confirmar
   antes de apagar" é `"confirm dialog"`. Resultado fraco: reformular uma vez;
   segue fraco, o assunto não está coberto e segue sem guia.
2. **Ler o guia** dos `id` que batem, mais o guia geral da área quando
   houver (`html`, `css`, `forms`, `accessibility`, `performance`). Saída
   grande vai para um arquivo temporário: ler inteiro.
3. **No plano, citar o `id`** de cada guia que decidiu um recurso. O código
   segue o guia, com o fallback que ele pedir.
4. **Na entrega, uma linha por guia usado:** o `id` e o que ele mudou no
   código. Consultou e nenhum serviu: dizer qual e por quê, numa linha.

## Suporte de navegador

Sem regra no `CLAUDE.md` do projeto, vale o padrão do guia: recurso
**Baseline Widely available** se usa direto; o resto, com o fallback que o
guia manda. Se o projeto precisar de outra política (navegador velho, sem
polyfill), sugerir escrevê-la no `CLAUDE.md` do projeto, numa linha.

## Atualizar a versão

Baixar a nova com `npm pack modern-web-guidance@<versão>` numa pasta vazia,
ler o `SKILL.md` deles e o que mudou no CLI, rodar o `skill-scanner`, e só
então trocar o número aqui e no `revisar-interface`.
