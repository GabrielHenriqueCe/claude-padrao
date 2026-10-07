# claude-padrao

Regras e skills do Claude Code para usar em todo projeto. Cada pessoa junta a
elas um arquivo pessoal próprio, fora daqui (ver "Instalar numa máquina").

```
claude-padrao/
├── .claude-plugin/marketplace.json   o catálogo que o Claude Code lê
├── regras/
│   ├── padrao.md                     todo projeto: como trabalhar, Git, nomes, comentários, contexto cheio
│   ├── csharp.md                     quem importar: camadas, static, enum, DTO, web com banco
│   └── aprendizado.md                quem importar: a pessoa escreve, o Claude orienta em passos
└── plugins/padrao/
    ├── hooks/contexto.js             avisa o Claude quando o contexto passa de 50%
    └── skills/
        ├── depurar/                  método para caçar a causa de um defeito
        ├── revisar-csharp/           checklist de C# e Clean Architecture
        └── revisar-interface/        revisão de tela: acessibilidade, foco, animação
```

## Regras e skills chegam por caminhos diferentes

| | Como chega | Quando o Claude usa |
|---|---|---|
| **Regras** | `CLAUDE.md` importa os arquivos deste clone | sempre |
| **Skills** | plugin instalado a partir deste repositório | quando a tarefa é do assunto |

## Instalar numa máquina

**1. As regras de todo projeto.** Clonar este repositório em
`C:\Users\<você>\source\repos\` e criar o `C:\Users\<você>\.claude\CLAUDE.md`
com o `padrao.md` e, se quiser, um arquivo seu:

```
@~/source/repos/claude-padrao/regras/padrao.md
@~/source/repos/<seu-repositorio>/pessoal.md
```

O arquivo pessoal é o que vale só para você, por cima do `padrao.md`: como
prefere aprender, que terminal usa, em que idioma está o seu editor. Fica num
repositório seu (privado, se preferir), não aqui. Usa um computador só? Pode
escrever direto no `~/.claude/CLAUDE.md`, abaixo do import.

**2. As skills.**

```
claude plugin marketplace add GabrielHenriqueCe/claude-padrao
```
```
claude plugin install padrao@claude-padrao
```

Ficam como `/padrao:depurar`, `/padrao:revisar-csharp` e
`/padrao:revisar-interface`, e o Claude também as usa sozinho quando a tarefa é
do assunto.

## Num projeto

As regras opcionais entram pelo `CLAUDE.md` do projeto, uma linha cada:

```
@~/source/repos/claude-padrao/regras/csharp.md
@~/source/repos/claude-padrao/regras/aprendizado.md
```

O `CLAUDE.md` do projeto completa as regras daqui e, quando discorda, ganha. Mas
ele só ganha onde escreve o contrário: o que o projeto decidiu diferente tem que
estar escrito lá.

**As lições nascem nos projetos e sobem para cá.** Quando uma regra evoluir
num projeto e valer para todos, trazer a versão nova para o `padrao.md` no
mesmo dia — senão as cópias divergem, e nenhuma ferramenta de um projeto
enxerga este repositório.

**Não enxugar o `CLAUDE.md` do projeto contando com este repositório.** Os
imports só existem nesta máquina: uma sessão na nuvem ou em outro computador
não os vê. O global acrescenta; o do projeto continua completo sozinho.

## Atualizar

- **Regras:** `git pull` neste clone. Vale na próxima sessão.
- **Skills:** o plugin tem `version`. Quem instalou só recebe uma mudança quando
  o número muda, então **mudou uma skill, aumentar o `version` no
  `plugin.json`**. Recebe-se com `/plugin marketplace update claude-padrao`.

## O aviso de contexto cheio

O Claude não vê quanto da janela de contexto já usou. O hook `contexto.js` do
plugin lê o transcript a cada mensagem e, a partir de 50%, diz a ele "Contexto
em X% da janela de Y". A regra "Contexto cheio" do `padrao.md` diz o que fazer:
avisar, fechar no ponto de parada, atualizar o arquivo de contexto e sugerir o
`/clear`, que quem dá é a pessoa.

- Precisa do **Node.js** no PATH. Funciona igual no terminal e no app.
- A janela sai do modelo que deu a última resposta, então cada sessão mede a
  sua, e trocar de modelo no meio já muda a conta:

  | Modelo | Janela |
  |---|---|
  | Opus e Sonnet 4.6 em diante, Fable | 1M |
  | Haiku, Opus e Sonnet até a 4.5 | 200k |

  Valores da documentação de modelos (09/2026). Modelo que o hook não conhece
  conta como 1M. Se o indicador de contexto do app mostrar outra janela,
  definir `CLAUDE_CONTEXTO_JANELA` (em tokens) no `env` do
  `~/.claude/settings.json`. O aviso mostra a janela usada, para o erro
  aparecer.
- O aviso só chega quando a pessoa manda mensagem: um turno longo e sozinho
  pode passar de fase sem aviso.

## A revisão de interface

`revisar-interface` usa as **Web Interface Guidelines**, uma lista aberta de
regras de interface publicada pela Vercel (licença MIT, em `LICENSE-vercel`).
Não tem nada a ver com hospedar na Vercel: as regras valem para qualquer tela
web — site estático, React ou o front em WebView2. A cópia é fixa em
`regras-vercel.md`, para o que roda ser o que foi revisado.

## Conferir antes de commitar

```
claude plugin validate .
```
