# Tmcel – redesenho académico (UniSCED / Tecnologias Web 2026)

Website estático em HTML, CSS e JavaScript que redesenha [tmcel.mz](https://www.tmcel.mz/) com a marca oficial, preços reais e as funcionalidades pedidas no enunciado: pesquisar, ordenar e gerir o que é do visitante (carrinho, favoritos, conta).

## Páginas

- `index.html` – início
- `pacotes.html` – catálogo oficial (busca, ordenação, activar com M-Cash, favoritos)
- `servicos.html` – índice dos 35 serviços oficiais
- `produto.html` – ficha de produto `?id=`
- `lojas.html` – pontos de atendimento
- `noticias.html` / `noticia.html` – notícias com «Ler mais»
- `suporte.html` – FAQ
- `contacto.html` – formulário com localStorage
- `conta.html` – número do cartão + OTP, saldo M-Cash, histórico
- `comparacao.html` – original vs redesenho
- `relatorio.html` – relatório do trabalho (imprimir para PDF)

## Conta e M-Cash (demonstração)

- Número de exemplo: `82 123 4567`
- PIN M-Cash: `1234`
- O OTP é simulado e aparece no ecrã (válido 5 minutos)

O catálogo e as lojas oficiais não se alteram. O visitante só gere carrinho, favoritos, mensagens e pagamentos.

## Como abrir localmente

Abrir `index.html` no navegador, ou:

```bash
python3 -m http.server 8080
```

## Hospedagem na Vercel

Projecto estático na raiz (sem build).

1. Instalar a CLI: `npm i -g vercel`
2. Na pasta do projecto: `vercel`
3. Confirmar que o output é a pasta actual (`.`)

Colocar o URL público e o link do Google Drive no relatório, conforme o enunciado.

## Tecnologias

HTML5 semântico, CSS (Flexbox, Grid, media queries), JavaScript (DOM, localStorage, pesquisa linear, `Array.sort`).
