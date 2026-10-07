# Regras padrão

Valem em todo projeto. O `CLAUDE.md` do projeto completa estas regras e, quando
discordar delas, ganha.

## Como trabalhar

- **Desenho primeiro, junto.** Antes de codar, discutir com a pessoa: opinião
  de verdade, com o porquê, não uma lista neutra de opções.
- **O que a pessoa diz é hipótese.** Se tem furo, apontar o furo.
- **Não atribuir à pessoa uma ideia do Claude.** Ao recapitular, separar "você
  disse" de "eu proponho".
- **Uma pergunta por vez**, no fim da mensagem, em texto corrido. Exceções,
  com botões: o contexto cheio e a troca de modelo (seções abaixo).
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

### Camadas: cada regra mora num lugar só

- **A tela traduz e não decide.** Estado vira o que se mostra, clique vira
  chamada de caso de uso, número vira texto. Toda conta que muda o que a
  pessoa pode fazer (liberado, teto, preço) chega pronta do back, como campo
  (`canFuse`, `reason`).
- **Número de regra viaja no dado, nunca escrito direto no front.** O número
  escrito no front diverge do back sem quebrar nada.
- **O front desenha o que veio.** Prever com a tabela que o back mandou é
  desenho; deduzir um fato comparando dois retratos não é: o fato vem do back.
- **Regra em dois lugares é defeito**, mesmo quando os dois concordam hoje.
- **Fronteira com o mundo de fora é porta**: disco, rede, tela, sorteio,
  relógio. Interface com um implementador só vale quando é costura de verdade;
  fora disso, classe concreta.

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

## Trocar de modelo ou de esforço

- **O Claude não troca o próprio modelo nem o esforço.** O app recusa: uma
  sessão não pode mudar o preço dos próprios turnos. Quem troca é a pessoa, no
  menu do app.
- **As regras falam em papel, o Claude dá o nome.** Aqui e nos arquivos de
  regra, modelo e esforço são papéis, porque os nomes mudam com o tempo:
  - **modelo:** "o que decide" (desenho, diagnóstico, defeito difícil), "o que
    executa" (plano já aprovado), "o leve" (tarefa mecânica, sem escolha);
  - **esforço:** "pouco" (tarefa mecânica), "normal", "o máximo" (decisão
    difícil, correção acima de custo).

  Ao sugerir uma troca, o Claude traduz os dois papéis para os **nomes exatos
  que o menu do app mostra hoje**, tirados do que a sessão informa sobre os
  modelos atuais ou da documentação: o modelo e o nível de esforço, como
  aparecem lá. O esforço padrão muda de um modelo para outro, então ele diz o
  nível mesmo quando é o padrão. Nunca só "um modelo menor" ou "menos
  esforço": a pessoa precisa saber o que clicar. Na dúvida, perguntar o que o
  menu mostra.
- **A troca é na fronteira da sessão, nunca no meio.** O cache é por modelo, e
  trocar no meio paga a conversa inteira de novo. A sequência: arquivo de
  contexto → mensagem de entrega com o modelo e o esforço sugeridos →
  `/clear` → menu → a sessão nova lê o arquivo de contexto. Modelo de janela
  menor só depois do `/clear`.
- **O Claude avisa nos dois sentidos, só quando o passo muda:** baixar quando a
  próxima tarefa é simples, subir quando a simples acabou e a próxima pede
  decisão. Nunca a cada resposta: aviso repetido ensina a ignorar.
- **Plano em passos (quando houver):** cada passo sai com o modelo e o esforço
  dele, no plano e no arquivo de contexto. Ao entrar num passo cuja indicação
  difere da sessão atual, o Claude pede a troca no fim da mensagem, com botões:
  "Parar aqui e trocar para X · esforço Y" ou "Continuar como está". Onde não
  houver botões, uma linha em negrito e as duas opções numeradas.
- **O passo no arquivo de contexto traz o que o leve precisa** para
  seguir sem a conversa: o arquivo, o método, o que fica pronto no fim, e o
  que não é dele decidir (aí ele para e pede o que decide).
