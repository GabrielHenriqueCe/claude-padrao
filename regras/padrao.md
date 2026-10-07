# Regras padrão

Valem em todo projeto. O `CLAUDE.md` do projeto completa estas regras e, quando
discordar delas, ganha.

## Como trabalhar

- **Desenho primeiro, junto.** Antes de codar, discutir com a pessoa: opinião
  de verdade, com o porquê, não uma lista neutra de opções.
- **O que a pessoa diz é hipótese.** Se tem furo, apontar o furo.
- **Não atribuir à pessoa uma ideia do Claude.** Ao recapitular, separar "você
  disse" de "eu proponho".
- **Uma pergunta por vez**, no fim da mensagem, em texto corrido.
- **Só o que foi pedido.** Na dúvida, perguntar em uma linha antes de editar.
- **Verificar o que a mudança alcança**, não tudo.
- **Texto para colar** (commit, PR, mensagem) vai num bloco só com o conteúdo
  final. Recado do Claude fica fora do bloco.

## Git

- **Nada de commit, push, merge ou PR sem o ok da pessoa.** O commit é o
  momento em que ela revisa o trabalho.
- Uma branch por vez, sem empilhar branches.
- Nunca o link da sessão (`claude.ai/code/...`) na mensagem de commit.
- Nunca propor desfazer o que a pessoa já executou sem perguntar antes.
- Comando para colar: na sintaxe do terminal da pessoa, um por bloco, e com
  caminho absoluto quando for destrutivo.

O formato da mensagem de commit, o tamanho de cada commit e se o ok do commit
vale também para o push são do projeto.

## Código

- **Nome diz o que é** no código novo. Nada de letra solta, sigla ou
  abreviação: `project =>`, não `p =>`. Exceção: `_` para o que não é usado.
  Código existente se renomeia só quando a tarefa mexe naquele trecho.
- **O que varia por fora entra por parâmetro** na regra — o "hoje", o sorteio
  —, nunca `DateTime.Now` ou `Random` lá dentro. A regra fica testável.

### Comentário

| O que se quer dizer | Onde mora |
|---|---|
| o que a linha faz | em lugar nenhum: o código diz |
| por que esta linha é assim, o que quebra se mudar | comentário curto, na linha |
| por que este desenho e não outro | documento de decisão do projeto |
| o que foi tentado, o histórico, o "antes era X" | mensagem de commit |
| contrato entre camadas | comentário de documentação na superfície pública |

Armadilha ativa nunca se corta: o que quebra em silêncio se alguém "melhorar"
o código. Explicação didática vai na conversa, não no arquivo.

## Contexto cheio: fechar, entregar e a pessoa limpa

O Claude não vê quanto da janela de contexto já usou: o número de tokens que
chega até ele é o saldo da sessão, não a janela, e conta feita sobre ele erra.
Quem mede é o hook `contexto.js` do plugin `padrao`: a cada mensagem da
pessoa, a partir de 50%, ele põe na conversa "Contexto em X% da janela de
Yk". Sem o plugin, quem avisa é a pessoa, olhando o indicador de contexto do
app. Fases: amarela a partir de 50%, vermelha a partir de 75%.

- **Fase amarela**: dizer à pessoa, numa linha no começo da resposta, em
  quantos % o contexto está, e de qual janela: na primeira vez que a fase
  aparecer, e de novo só quando ela mudar. Se a pessoa disser que o
  indicador do app mostra outra janela, o aviso está errado: dizer que ela
  corrige com `CLAUDE_CONTEXTO_JANELA` no `env` do `~/.claude/settings.json`.
  Daí em diante, seguir a tarefa até o próximo ponto de parada, sem abrir
  assunto novo.
- **Fase vermelha**: avisar numa mensagem própria, com o número, e **perguntar
  com botões** (a ferramenta de pergunta com opções, exceção ao "texto
  corrido"): "Parar no ponto mais próximo e entregar" ou "Terminar a tarefa
  antes". Onde a ferramenta não existir, uma mensagem só com isso: a primeira
  linha em negrito ("Contexto no limite.") e as duas opções numeradas.
- **Resumo automático**: se a conversa recomeçou de um, o limite já passou e o
  resumo perde detalhe (caminhos, números, o que já foi verificado). Antes de
  qualquer outra coisa, reler o arquivo de contexto e o `git status`/`git
  diff`, e só então avisar e perguntar como na fase vermelha. O que o resumo
  afirma e não está no disco é hipótese.
- **Ponto de parada** é um passo terminado: um commit feito, o diff parado
  esperando o ok, ou o texto do commit entregue onde o Claude não commita.
  **Nunca commitar para chegar nele.** Sem ponto de parada perto, escolher o
  lugar de onde a sessão nova consiga se orientar sozinha. Nunca parar no meio
  de uma edição.
- **No ponto de parada**, reescrever o arquivo de contexto que o `CLAUDE.md` do
  projeto indicar (se não indicar, um `CTX.md` na raiz, no
  `.git/info/exclude`) com onde paramos, o que está pendente, as decisões e o
  próximo passo: tudo o que a sessão nova precisa para retomar sem esta
  conversa. Se o arquivo for versionado, a reescrita entra na branch em
  andamento: junto com o diff que espera o ok ou, se o commit já foi feito,
  num commit novo que também espera o ok (onde o Claude não commita, entra no
  texto do commit entregue). Sem branch aberta, fica sem commit e a entrega
  diz em que commit ele vai entrar (normalmente o primeiro da próxima branch).
- **Depois, a mensagem de entrega**, que é o recibo da pessoa. Ela aponta para
  o arquivo de contexto em vez de repeti-lo, e diz:
  - o que foi feito e o que falta;
  - o estado do Git: a branch, o que está sem commit (com o texto do commit,
    se ficou pendente), commit sem push, PR para abrir ou mergear;
  - o que ficou rodando (API, servidor, navegador de teste) ou foi encerrado;
  - o que só a pessoa pode fazer: decidir, mergear, conferir na tela;
  - a frase para abrir a sessão nova, por exemplo: "lê o `CTX.md` e continua
    do passo 2".

  Ela termina sugerindo o `/clear`. **Quem limpa é a pessoa, nunca o Claude**:
  tela limpa sem essa mensagem deixa ela sem saber o que foi feito nem o que
  falta.
