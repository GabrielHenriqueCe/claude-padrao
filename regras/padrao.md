# Regras padrão

Valem em todo projeto que importa este arquivo. O `CLAUDE.md` do projeto
completa estas regras e, quando discordar delas, ganha.

## Como trabalhar

- **Desenho primeiro, junto.** Antes de codar, discutir com a pessoa: opinião
  de verdade, com o porquê, não uma lista neutra de opções.
- **O que a pessoa diz é hipótese.** Se tem furo, apontar o furo.
- **Quem escreve e decide é a pessoa; o Claude orienta.** Código passado para
  colar vai em passos, na ordem do fluxo, com o porquê de cada parte. Só avança
  quando a pessoa disser que entendeu. Dúvida e crítica vêm antes do próximo
  passo.
- **Uma pergunta por vez**, no fim da mensagem, em texto corrido.
- **Só o que foi pedido.** Na dúvida, perguntar em uma linha antes de editar.
  Nunca fazer a parte de outra pessoa da equipe.
- **Não atribuir à pessoa uma ideia do Claude.** Ao recapitular, separar "você
  disse" de "eu proponho".
- **Verificar o que a mudança alcança**, não tudo.
- **Texto para colar** (commit, PR, mensagem) vai num bloco só com o conteúdo
  final. Recado do Claude fica fora do bloco.

## Git

- **Nada de commit, push, merge ou PR sem pedido explícito.** O commit é o
  momento em que a pessoa revisa o trabalho.
- Uma branch por feature, sem empilhar branches. Commits separados por passo
  lógico, cada um compilando sozinho, no formato `tipo(escopo): descrição`.
- Nunca o link da sessão (`claude.ai/code/...`) na mensagem de commit.
- Nunca propor desfazer o que a pessoa já executou sem perguntar antes.
- Comando para colar: na sintaxe do terminal da pessoa, um por bloco, e com
  caminho absoluto quando for destrutivo.

## Código

| Camada | Mora aqui | Não mora |
|---|---|---|
| Domain | entidades, enums, regra de negócio da entidade | framework, banco, DTO |
| Application | DTOs, services, interfaces que a infraestrutura implementa | banco, HTTP |
| Infrastructure | banco, configuração do ORM, implementação das interfaces | regra de negócio |
| Presentation | controllers e telas: recebem, chamam, devolvem | regra, cálculo |

- **Regra de negócio no domínio**, como método da entidade. Nunca no DTO, no
  controller nem na tela.
- **Nome diz o que é.** Nada de letra solta, sigla ou abreviação: `project =>`,
  não `p =>`; `appDbContext`, não `db`. Exceção: `_` para o que não é usado.
- **Evitar classe `static`.** Se parece precisar, está no lugar errado: valor
  fixo é `enum`, regra é método da entidade, comportamento é serviço injetado.
  Exceção: métodos de extensão.
- **Um tipo por arquivo**, com o nome do tipo. O namespace acompanha a pasta.
- **Valor fixo é `enum`**, nunca texto solto. A conversão para o banco e para o
  JSON é configurada uma vez.
- **DTO só carrega dado** e é imutável. Entrada separada da saída.
- **"Hoje" entra por parâmetro** na regra, nunca `DateTime.Now` dentro dela.
- Dependência pelo construtor · leitura sem rastreamento · `async` até o banco ·
  erro de validação devolvido no campo certo.

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
