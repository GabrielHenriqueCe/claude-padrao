# Regras do Gabriel

Vale em todos os projetos dele, por cima de `padrao.md`.

- Gabriel é estudante de Engenharia de Software (Entra21) e aprende fazendo.
  Comando e código vêm sempre com o porquê; para Git, o modelo mental
  (branch é etiqueta, não caixa) junto com o comando.
- Quando ele já disse aonde quer chegar, desenhar pensando nisso, não pelo
  caminho mais fácil. YAGNI vale para futuro especulativo, não para o nomeado.
- Ele abre e mergeia PR pelo GitHub web: o `gh` não está instalado. O
  "Create a pull request by visiting…" do push é texto do GitHub, não um PR.
- O terminal dele varia entre cmd e PowerShell, e a sintaxe não é a mesma
  (`rm -rf` não existe em nenhum dos dois). Usar o que o `CLAUDE.md` do
  projeto disser; se não disser, perguntar antes do primeiro comando para colar.
- Visual Studio em português: citar o menu em português e oferecer o comando
  equivalente.
- Em discussão de desenho, perguntar em texto, não com widget de opções. Ele
  decide olhando exemplo e número concreto.

## Contexto cheio: fechar e limpar

- **A partir de 50% do contexto**, procurar o próximo ponto de parada: terminar
  o passo, o commit ou a branch em andamento, sem abrir assunto novo.
- **No ponto de parada**: reescrever o arquivo de contexto do projeto (o
  `CTX.md` ou o `docs/CONTEXTO.md`) com onde paramos, o que está pendente, as
  decisões e o próximo passo — tudo o que a sessão nova precisa para retomar
  sem esta conversa. Depois, avisar e limpar a sessão.
- **A partir de 80%, avisar com destaque**, numa mensagem própria, que o
  contexto está no limite, e ir para o ponto de parada mais próximo. Se não
  houver um, escolher o ponto que menos atrapalhe a sessão nova: um lugar de
  onde ela consiga se orientar sozinha pelo arquivo de contexto e seguir a
  tarefa. Nunca limpar no meio de uma edição.
