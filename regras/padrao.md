# Regras padrão

Valem em todo projeto. O `CLAUDE.md` do projeto completa estas regras e, quando
discordar delas, ganha. O que só vale numa situação mora numa skill do plugin
`padrao` e carrega quando a situação chega: `fechar-sessao`, `trocar-modelo`,
`sessao-filha`.

## Como trabalhar

- **Desenho primeiro, junto.** Antes de codar, discutir com a pessoa: opinião
  de verdade, com o porquê, não uma lista neutra de opções. Na discussão:
  - **fato o Claude busca sozinho** (no código, no `git log`, na
    documentação); só a decisão vai para a pessoa;
  - **cada pergunta leva a recomendação**, escrita de modo que um "sim"
    aceite a recomendação;
  - **primeiro o que já dá para responder**, sem depender de outra decisão em
    aberto, e entre essas a que destrava mais;
  - **o desenho termina quando nada ficou assumido em silêncio.**
- **O que a pessoa diz é hipótese.** Se tem furo, apontar o furo.
- **Não atribuir à pessoa uma ideia do Claude.** Ao recapitular, separar "você
  disse" de "eu proponho".
- **Uma pergunta por vez**, no fim da mensagem, em texto corrido. Exceções,
  com botões: o contexto cheio e a troca de modelo.
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
- **Segredo não entra no Git.** Onde o projeto guarda segredo de verdade
  (token, connection string, chave de JWT), o hook de pre-commit do projeto
  chama o `gitleaks`. O hook é o *quando*; o `gitleaks` é o *quê*, porque
  reconhece centenas de formatos de chave. Sem segredo no projeto, sem hook.

O formato da mensagem de commit, o tamanho de cada commit e se o ok do commit
vale também para o push são do projeto.

## O que entra em toda sessão

Cada resposta relê a conversa inteira, e mais o que carrega sozinho: este
arquivo, o `CLAUDE.md`, o índice da memória, a lista de skills, os conectores.
O que fica ali paga em toda resposta, e sessão longa paga mais do que tudo.

- **Uma sessão por assunto.** Assunto novo, sessão nova: a velha relê o que
  não serve mais.
- **Arquivo de contexto curto**: estado, pendente e próximo passo, por volta
  de 5 KB. A história vai para a mensagem de commit; o plano detalhado de um
  assunto, para um documento dele, lido quando o assunto voltar.
- **O `CLAUDE.md` do projeto não repete este arquivo**: escreve só o que é do
  projeto. Exceção: projeto de equipe, ou que roda fora desta máquina, fica
  completo sozinho e sem `@~/`, porque o import só existe aqui.
- **Saída enxuta nos comandos**: pedir só o que a decisão precisa
  (`dotnet build -v q -clp:ErrorsOnly`, `dotnet test --nologo -v q`). A saída
  inteira fica no contexto até o fim da sessão.
- **Skill, plugin e conector no nível do usuário só se servem a todo
  projeto.** O que é de um tipo de projeto liga no projeto: o plugin fica
  desligado no usuário e o projeto o liga em `enabledPlugins`, no
  `.claude/settings.json`; a skill avulsa vai para o `.claude/skills/` do
  projeto. Conector do claude.ai, no app desktop, não se desliga por projeto:
  o que não serve à maioria fica desligado por padrão, e liga na sessão que
  precisa.
- **O deny recusa a chamada, mas a skill continua na lista** (e no custo).
  Quando duas tratam do mesmo assunto, o `CLAUDE.md` do projeto diz, numa
  linha, qual usar.
- **Mudar permissão ou `enabledPlugins` pede o ok da pessoa naquele projeto.**
- **Skill de terceiro, antes de instalar:** ler o que ela faz, rodar o
  `skill-scanner` e conferir à mão cada coisa que ele acusa.
- **Contexto passou de 50%, a conversa recomeçou de um resumo automático, ou
  a etapa acabou:** skill `padrao:fechar-sessao`. O hook `contexto.js` do
  plugin avisa a porcentagem; o Claude sozinho não vê.

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
- **Módulo fundo**: muito comportamento atrás de uma interface pequena. A
  mudança, o defeito e o teste de um assunto ficam num lugar só. A interface é
  a superfície de teste: se o teste precisa passar por trás dela, o módulo
  está com a forma errada.
- **Teste da deleção**: imagine apagar o módulo. Se a complexidade some, ele
  era só repasse; se ela reaparece espalhada nos chamadores, ele se paga.
- **Revisão de arquitetura começa pelos pontos quentes**: o `git log` mostra
  onde o código mais muda, e é lá que aprofundar um módulo compensa. O resto
  fica como está até doer.

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

## Modelo e esforço

As regras falam em papel, porque os nomes mudam com o tempo:

- **modelo:** "o que decide" (desenho, diagnóstico, defeito difícil), "o que
  executa" (plano já aprovado), "o leve" (tarefa mecânica, sem escolha). **O
  leve nunca decide:** topou com uma decisão, para e pede a troca;
- **esforço:** "pouco" (tarefa mecânica), "normal", "o máximo" (decisão
  difícil, correção acima de custo).

O Claude não troca o próprio modelo nem o esforço: quem troca é a pessoa, no
menu. Quando o passo muda de nível, ou ao montar um plano em passos, ele sugere
a troca pela skill `padrao:trocar-modelo`, que traz a tabela de nota × custo.

## Plano antes do código

Erro de desenho é barato no plano e caro no diff. Toda sessão que mexe em
código segue três passos.

1. **Plano, no "o que decide" · "o máximo".** Em texto curto:
   - o que muda e em que arquivo;
   - onde mora cada regra nova (camada, classe, método) e a costura que ela
     usa, pelo nome;
   - os testes, e a sabotagem que tem de derrubá-los (mudar o código de
     propósito e ver o teste ficar vermelho);
   - a conferência abaixo, respondida sobre o plano.

   A pessoa valida, e só então se coda. O plano validado vai para o arquivo
   de contexto **fechado**: nenhuma decisão aberta, toda costura nomeada. É
   isso que deixa um modelo menor executar sozinho. Exceções, que planejam na
   própria sessão do código: passo de esforço "pouco" (mecânico) e correção
   pequena com a causa já diagnosticada.
2. **Código, no modelo e esforço do passo.** Se forem os do plano, segue na
   mesma sessão. Se não, e a ferramenta de sessões existir, o código vai para
   uma sessão filha já no modelo do passo (skill `padrao:sessao-filha`). Sem a
   ferramenta: arquivo de contexto, `/clear`, troca, e a sessão nova executa.
   **Quem executa não redesenha:** o que o plano não cobre, ou um caminho que
   pareça melhor, é parar e perguntar.
3. **Conferência antes de mostrar o diff:** a mesma tabela, agora sobre o
   diff, na mensagem à pessoa. O que dá para corrigir, corrige antes de
   mostrar; o que pede decisão, para e pergunta.

**A conferência:** cada linha ✅ ou ❌, com o porquê numa frase.

| Pergunta | ❌ quando |
|---|---|
| Um teste só da camada de regra pega cada regra nova? | ela depende de um `if` na orquestração ou na tela |
| Algum `if` fora da camada de regra decide o que acontece? | decide algo além de ordem, persistência ou desenho |
| A mesma regra mora em dois lugares? | há duas cópias, ou dois "espelhos" em camadas diferentes |
| O front recebe pronto? | há número de regra escrito no front, ou fato deduzido comparando retratos |
| A fronteira com o mundo de fora é porta? | relógio, sorteio, disco ou rede são chamados direto na regra |
| Segue o desenho do plano? | trocou o mecanismo, ou usou costura que o plano não nomeia |
| O que a documentação promete tem teste, e a sabotagem derrubou? | há frase sem teste, ou sabotagem que passou verde |
| O esperado de cada teste vem de fonte independente? | o teste recalcula o que o código faz (`Assert.Equal(a + b, Add(a, b))`) e passa por construção; o esperado tem de ser um número escrito à mão, um exemplo resolvido ou a especificação; snapshot regravado pela própria ferramenta só vale comparado a uma especificação escrita à mão |

O projeto acrescenta as perguntas do vocabulário dele.
