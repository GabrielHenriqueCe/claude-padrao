---
name: depurar
description: Usar ANTES de caçar a causa de um defeito — "não funciona", "quebrou", "está errado", tela em branco, número que não bate, teste vermelho herdado, comportamento que some quando se olha. Também vale quando o trabalho é escrever o teste ou a ferramenta que prende um defeito.
---

# Depurar

Quatro fases, e a ordem é o método. Pular a 2 para ir direto na 4 é o erro
clássico: a correção "óbvia" conserta um sintoma vizinho e o defeito volta de
outra forma.

## 1. Reproduzir — pôr o defeito num lugar que dispara à vontade

Defeito que só aparece usando o sistema é anedota. Antes de tudo, achar o
gatilho que roda em segundos: um teste, uma chamada no Swagger, um script.

- Rodar os testes e verificações **antes** de mexer. É o que evita herdar
  vermelho de outra sessão como se fosse seu.
- O que não se reproduz por código — pixel, cor, animação, "ficou feio" — é da
  pessoa conferir. Pedir para ela olhar, não adivinhar.

## 2. Instrumentar — medir o caminho, nunca adivinhar

A hipótese bonita perde para uma sonda feia. Antes de propor causa, imprimir o
estado no ponto exato: o que entrou, o que saiu, quem é `null`.

- **Ler o caminho, não o resultado.** Verde pode ser verde por não ter rodado:
  uma lista vazia faz o laço nunca executar, e ninguém vê.
- **O grep mente.** O nome pode estar em comentário, em documento morto, ou ser
  outro símbolo com a mesma grafia. Verificar antes de concluir.
- Sonda é temporária e sai antes do commit.

## 3. Prender — a rede que falha agora

Corrigir sem rede é trocar um defeito por uma data de validade. O teste vem
antes de mover a primeira linha, e só vale depois de provar que pega.

- **Prova por sabotagem:** quebrar de propósito o que o teste deveria pegar e
  ver o teste acusar — pelo motivo certo.
- **Desfazer a sabotagem editando de volta**, nunca com `git checkout --`: ele
  restaura o arquivo inteiro para o último commit e apaga junto todo o trabalho
  não commitado. Depois, o `git diff` do arquivo sabotado tem de vir vazio.
- **Rodar a fiação, não só as peças.** Teste que monta o objeto na mão não vê a
  exceção que só acontece no caminho real de montagem.

## 4. Corrigir e varrer

- Consertar a causa, não o sintoma.
- **Renomeou, moveu, apagou ou concluiu?** Procurar o nome velho em documentos,
  `CLAUDE.md`, `README.md` e skills, no mesmo commit. O que descreve no presente
  vira erro; o que descreve no passado é história e fica.
- Fechar com o build e os testes que a mudança alcança.

## Armadilhas que não se deduzem do código

| Sintoma | Causa |
|---|---|
| `sed -i` mudou o arquivo inteiro no `git diff` | ele reescreve CRLF como LF em todo arquivo que toca |
| linhas somem e o build passa | edição em arquivo com CRLF e LF misturados; quem denuncia é `git diff --numstat` |
| build falha sem motivo no Windows | o programa está aberto e trava o `.exe`/`.dll` |
| documento "certo" apontando para o lugar errado | sobrou de um rename ou de uma pasta movida |
