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
