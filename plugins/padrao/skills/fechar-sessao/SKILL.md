---
name: fechar-sessao
description: Usar quando o hook avisar "Contexto em X%", quando a conversa recomeçar de um resumo automático, ou ao fechar uma etapa para a sessão nova retomar. Diz como avisar, onde parar, o que escrever no arquivo de contexto e na mensagem de entrega.
---

# Fechar a sessão

O Claude não vê quanto da janela de contexto já usou: o número de tokens que
chega até ele é o saldo da sessão, não a janela, e conta feita sobre ele erra.
Quem mede é o hook `contexto.js` do plugin `padrao`: a cada mensagem da
pessoa, a partir de 50%, ele põe na conversa "Contexto em X% da janela de
Yk". Sem o plugin, quem avisa é a pessoa, olhando o indicador do app. Fases:
amarela a partir de 50%, vermelha a partir de 75%.

## Fases

- **Amarela:** dizer à pessoa, numa linha no começo da resposta, em quantos %
  o contexto está e de qual janela. Na primeira vez que a fase aparecer, e de
  novo só quando ela mudar. Se a pessoa disser que o indicador do app mostra
  outra janela, o aviso está errado: ela corrige com `CLAUDE_CONTEXTO_JANELA`
  no `env` do `~/.claude/settings.json`. Daí em diante, seguir a tarefa até o
  próximo ponto de parada, sem abrir assunto novo.
- **Vermelha:** avisar numa mensagem própria, com o número, e **perguntar com
  botões** (a ferramenta de pergunta com opções): "Parar no ponto mais
  próximo e entregar" ou "Terminar a tarefa antes". Onde a ferramenta não
  existir, uma mensagem só com isso: a primeira linha em negrito ("Contexto
  no limite.") e as duas opções numeradas.
- **Resumo automático:** se a conversa recomeçou de um, o limite já passou, e
  o resumo perde detalhe (caminhos, números, o que já foi verificado). Antes
  de qualquer outra coisa, reler o arquivo de contexto e o `git status` /
  `git diff`, e só então avisar e perguntar como na fase vermelha. O que o
  resumo afirma e não está no disco é hipótese.

## Ponto de parada

É um passo terminado: um commit feito, o diff parado esperando o ok, ou o
texto do commit entregue onde o Claude não commita. **Nunca commitar para
chegar nele.** Sem ponto de parada perto, escolher o lugar de onde a sessão
nova consiga se orientar sozinha. Nunca parar no meio de uma edição.

## Arquivo de contexto

No ponto de parada, reescrever o arquivo de contexto que o `CLAUDE.md` do
projeto indicar (se não indicar, um `CTX.md` na raiz, no `.git/info/exclude`):
onde paramos, o que está pendente, as decisões e o próximo passo. É tudo o que
a sessão nova precisa para retomar sem esta conversa, e nada além disso: a
história vai para o commit (regra "O que entra em toda sessão").

Se o arquivo for versionado, a reescrita entra na branch em andamento: junto
com o diff que espera o ok ou, se o commit já foi feito, num commit novo que
também espera o ok (onde o Claude não commita, entra no texto do commit
entregue). Sem branch aberta, fica sem commit, e a entrega diz em que commit
ele vai entrar (normalmente o primeiro da próxima branch).

## Mensagem de entrega

É o recibo da pessoa. Aponta para o arquivo de contexto em vez de repeti-lo, e
diz:

- o que foi feito e o que falta;
- o estado do Git: a branch, o que está sem commit (com o texto do commit, se
  ficou pendente), commit sem push, PR para abrir ou mergear;
- o que ficou rodando (API, servidor, navegador de teste) ou foi encerrado;
- o que só a pessoa pode fazer: decidir, mergear, conferir na tela;
- a frase para abrir a sessão nova, por exemplo: "lê o `CTX.md` e continua do
  passo 2".

Termina sugerindo o `/clear`. **Quem limpa é a pessoa, nunca o Claude:** tela
limpa sem essa mensagem deixa ela sem saber o que foi feito nem o que falta.
