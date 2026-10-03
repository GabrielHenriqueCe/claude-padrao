# claude-padrao

Regras e skills do Claude Code que o Gabriel usa nos projetos pessoais.

```
claude-padrao/
├── .claude-plugin/marketplace.json   o catálogo que o Claude Code lê
├── regras/
│   ├── padrao.md                     todo projeto: como trabalhar, Git, nomes, comentários
│   ├── pessoal.md                    todo projeto: o que é só do Gabriel
│   ├── csharp.md                     quem importar: camadas, static, enum, DTO, web com banco
│   └── aprendizado.md                quem importar: a pessoa escreve, o Claude orienta em passos
└── plugins/padrao/skills/
    ├── depurar/                      método para caçar a causa de um defeito
    ├── revisar-csharp/               checklist de C# e Clean Architecture
    └── revisar-interface/            revisão de tela: acessibilidade, foco, animação
```

## Regras e skills chegam por caminhos diferentes

| | Como chega | Quando o Claude usa |
|---|---|---|
| **Regras** | `CLAUDE.md` importa os arquivos deste clone | sempre |
| **Skills** | plugin instalado a partir deste repositório | quando a tarefa é do assunto |

## Instalar numa máquina

**1. As regras de todo projeto.** Clonar este repositório em
`C:\Users\<você>\source\repos\` e criar o `C:\Users\<você>\.claude\CLAUDE.md`
com:

```
@~/source/repos/claude-padrao/regras/padrao.md
@~/source/repos/claude-padrao/regras/pessoal.md
```

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

**Não enxugar o `CLAUDE.md` do projeto contando com este repositório.** Os
imports só existem nesta máquina: uma sessão na nuvem ou em outro computador
não os vê. O global acrescenta; o do projeto continua completo sozinho.

## Atualizar

- **Regras:** `git pull` neste clone. Vale na próxima sessão.
- **Skills:** o plugin tem `version`. Quem instalou só recebe uma mudança quando
  o número muda, então **mudou uma skill, aumentar o `version` no
  `plugin.json`**. Recebe-se com `/plugin marketplace update claude-padrao`.

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
