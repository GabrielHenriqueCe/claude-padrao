# C# e Clean Architecture

Para importar no `CLAUDE.md` de projeto C# que adota estas regras. Valem para
código novo; o que já existe e foge delas vai para a refatoração, não para a
tarefa do momento.

| Camada | Mora aqui | Não mora |
|---|---|---|
| Domain | entidades, enums, regra de negócio da entidade | framework, banco, DTO |
| Application | DTOs, casos de uso, interfaces que a infraestrutura implementa | banco, HTTP |
| Infrastructure | banco, configuração do ORM, implementação das interfaces | regra de negócio |
| Presentation | controllers e telas: recebem, chamam, devolvem | regra, cálculo |

- **Regra de negócio no domínio**, como método da entidade. Nunca no DTO, no
  controller nem na tela.
- **Evitar classe `static`.** Se parece precisar, está no lugar errado: valor
  fixo é `enum`, regra é método da entidade, comportamento é serviço injetado.
  Exceção: métodos de extensão.
- **Um tipo por arquivo**, com o nome do tipo. O namespace acompanha a pasta.
- **Valor fixo é `enum`**, nunca texto solto. A conversão para o banco e para o
  JSON é configurada uma vez.
- **DTO só carrega dado** e é imutável (`record`, `init`). Entrada separada da
  saída. Perfis que veem dados diferentes recebem DTOs diferentes, nunca um DTO
  com campo nulo.
- **Dependência pelo construtor.**

## Web com banco

- Leitura com `AsNoTracking()`.
- `async` do controller até o banco, sem `.Result` nem `.Wait()`;
  `CancellationToken` repassado até a consulta.
- Erro de validação devolvido como `ValidationProblem`, com o erro no campo
  certo.
