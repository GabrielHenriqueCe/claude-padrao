---
name: revisar-interface
description: Revisar HTML, CSS e telas contra as Web Interface Guidelines — acessibilidade, foco, formulários, animação, tipografia, imagens, performance. Usar quando pedirem "revisar o site", "revisar a tela", "checar acessibilidade", "auditar o design" ou antes de publicar.
---

# Web Interface Guidelines

Cópia fixa das regras da Vercel. A skill original baixa as regras de uma URL a
cada execução, então o que roda pode não ser o que foi revisado. Aqui elas
moram junto da skill, em `regras-vercel.md`.

1. Ler `regras-vercel.md`, nesta mesma pasta. Não buscar na internet.
2. Ler os arquivos pedidos, ou perguntar quais.
3. Conferir cada regra e responder no formato `arquivo:linha - problema`, como
   o arquivo de regras pede.

As regras escritas para React (`onClick`, `useState`, hidratação) só se aplicam
quando a tela tiver script. Site estático não tem.

Para atualizar as regras: baixar de novo a URL do topo de `regras-vercel.md`,
revisar o diff e commitar.
