# Site da trIA

Landing page estática (Astro) publicada no GitHub Pages em https://educai2026.github.io/website/.
A identidade completa está em `trIA-identidade-visual/` (fonte da verdade; não editar os arquivos oficiais).

## Comandos
- `npm run dev` · `npm run build` · `npm run preview` (o site usa `base: '/website'`, abra `/website/`)
- Deploy: workflow `.github/workflows/deploy.yml` ao dar push na `main` (Node 24).
- `PUBLIC_MOCKUP=1 npm run build`: versão para compartilhar como página única (sem favicon/SEO e sem botão de imprimir).

## Onde fica cada coisa
- `src/pages/index.astro`: a página. Estilos em `src/styles/` (`global.css` tem as cores e os botões).
- `src/components/Demo.astro` + `src/scripts/demo.ts`: demonstração (questões, simulado, folha A4).
- `src/data/questoes.ts`: questões de exemplo. Fórmulas entre `\(` e `\)`, renderizadas com KaTeX no build.
- `src/components/Atendimento.astro` + `src/scripts/atendimento.ts` + `src/data/atendimento.ts`: atendimento e dúvidas.
- `src/config.ts`: link do formulário da lista de espera (`FORM_URL`).
- Logos: importados direto de `trIA-identidade-visual/` com `?raw` (SVG inline), sem cópias.

## Regras da marca (valem para qualquer texto ou tela)
- Escreva sempre **trIA** ("tr" minúsculo, "IA" maiúsculo). Nunca Tria, TRIA, TrIA.
- O **professor é o sujeito**: "você monta, revisa, decide". Não "a trIA gera".
- Proibido: "revolucionário", "incrível", "mágico", "a IA cria a prova por você", jargão (LLM, prompt, tokens).
- Algo não verificado deve ser dito como pendente. Nunca inventar depoimentos, números, preços ou selos de verificação reais.
- "ENEM" só no posicionamento ("padrão ENEM"), nunca no nome.
- Cores só pelas variáveis de `src/styles/global.css` (copiadas de `04-cores/cores.css`). Vermelho em pouca área:
  no máximo um bloco de destaque e uma linha vermelha por página/peça. Sem gradientes, brilhos, robôs, cérebros, circuitos.
  Sombra só em camadas flutuantes (atendimento, folha); nunca no logo.
- Contraste mínimo 4,5:1. Estados (verificado/pendente/fonte) sempre com ícone + texto.
- Fontes: Archivo 800 só em títulos; Atkinson Hyperlegible no texto; Source Serif 4 nas questões. Fórmulas com KaTeX.
- Logo: usar só os arquivos oficiais, respeitando área de proteção e tamanho mínimo (96 px; abaixo disso, o ícone).

## Visual
- Página clara (branco-papel, tinta marinho) com um único palco marinho, onde fica a demonstração.
- Sem cartões repetidos, sem rótulo em caixa alta acima de cada título, sem animação de entrada. Fios finos e espaço.

## Demonstração e atendimento
- Estados e taxa de similaridade da demonstração são ilustrativos, e a tela diz isso. Não remover esse aviso.
- Questão nova: conferir as contas, usar só habilidades conferidas na Matriz de Referência do ENEM e pedir revisão de um professor.
- O atendimento é um roteiro fixo: não chama API e não guarda respostas. Contato só pelo formulário.
- Editar o texto de uma questão sempre a devolve para "pendente".

## Git
- Commits, branches e PRs em minúsculas, curtos, no formato `feat: ...` / `fix: ...` (ex.: `feat/demo-interativa`).
