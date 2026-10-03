---
name: revisar-csharp
description: Revisar código C# e .NET contra as regras de Clean Architecture e boa prática — camadas, nomes, classe static, um tipo por arquivo, enum, DTO, comentários. Só quando a pessoa pedir: "revisa meu código", "está certo?", "confere o back".
disable-model-invocation: true
---

# Revisar C#

Revisar e **apontar**. Corrigir só se a pessoa pedir — e nunca em projeto que
importa `regras/aprendizado.md`, onde quem corrige é ela.

O que o `CLAUDE.md` do projeto decidiu diferente da lista abaixo não é defeito:
conferir lá antes de apontar.

1. Pegar o que mudou: `git diff` (e `git diff --cached` se já houver algo
   preparado). Sem diff, perguntar quais arquivos revisar.
2. Ler cada arquivo inteiro, não só o trecho alterado: camada e nome do
   arquivo também são revisão.
3. Conferir a lista abaixo e responder no formato
   `arquivo:linha — problema — o que fazer`, do mais grave para o menos grave.
4. Fechar com o que está bom, numa linha. Revisão só de defeito esconde o que
   deve ser repetido.

## O que conferir

**Camadas**
- Regra de negócio fora do domínio: no controller, no DTO, no service de
  aplicação ou na tela.
- Domain referenciando framework, banco ou DTO.
- Application usando o `DbContext` direto, em vez de uma interface que a
  Infrastructure implementa.
- Controller decidindo negócio: um `if` que fala de regra.

**Nomes**
- Letra solta, sigla ou abreviação: `p =>`, `e =>`, `db`, `ctx`, `res`, `err`.
- Nome que não diz o que guarda (`items` guardando obras, `data`, `obj`).
- Namespace diferente da pasta.

**Tipos**
- Classe `static` que não seja de métodos de extensão.
- Mais de um tipo por arquivo, ou arquivo com nome diferente do tipo.
- Conjunto fixo de valores como `string` em vez de `enum`.
- DTO com lógica, consulta ou cálculo; DTO mutável (`set` em vez de `init`).
- Um DTO só para perfis diferentes, com campo nulo para quem não pode ver.

**Comportamento**
- `DateTime.Now` dentro de regra de domínio.
- Leitura sem `AsNoTracking()`.
- `async` sem `await` até o banco, ou `.Result`/`.Wait()`.
- `CancellationToken` recebido e não repassado.
- Erro de validação que não volta como `ValidationProblem` com o campo certo.
- `null!` fora do código gerado pelo scaffold.

**Comentários**
- Comentário que repete o que o código diz.
- História ou defesa do PR no comentário: isso vai na mensagem de commit.
- Armadilha ativa sem comentário: o que quebra em silêncio se alguém
  "melhorar" o código.
