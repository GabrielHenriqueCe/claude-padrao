# claude-padrao

Regras e skills do Claude Code que o Gabriel usa em todos os projetos pessoais.

```
claude-padrao/
├── .claude-plugin/marketplace.json   o catálogo que o Claude Code lê
├── regras/
│   ├── padrao.md                     trabalho, Git, camadas, nomes, comentários
│   └── pessoal.md                    o que é só do Gabriel
└── plugins/padrao/skills/
    ├── depurar/                      método para caçar a causa de um defeito
    ├── revisar-csharp/               checklist de C# e Clean Architecture
    └── revisar-interface/            revisão de tela: acessibilidade, foco, animação
```

## Regras e skills chegam por caminhos diferentes

| | Como chega | Quando o Claude usa |
|---|---|---|
| **Regras** | o `CLAUDE.md` global importa os arquivos deste clone | sempre, em todo projeto |
| **Skills** | plugin instalado a partir deste repositório | quando a tarefa é do assunto |

## Instalar numa máquina

**1. As regras.** Clonar este repositório em `C:\Users\<você>\source\repos\` e
criar o `C:\Users\<você>\.claude\CLAUDE.md` com:

```
@~/source/repos/claude-padrao/regras/padrao.md
@~/source/repos/claude-padrao/regras/pessoal.md
```

O `CLAUDE.md` de cada projeto completa estas regras e, quando discorda, ganha.

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

## Atualizar

- **Regras:** `git pull` neste clone. Como o `CLAUDE.md` global importa os
  arquivos daqui, vale na próxima sessão.
- **Skills:** o plugin não tem `version`, então acompanha os commits deste
  repositório. Recebe-se com `/plugin marketplace update claude-padrao`, ou
  sozinho ligando o auto-update em `/plugin` → Marketplaces.

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
