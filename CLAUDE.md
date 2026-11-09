# Site da trIA

Landing page estática (Astro) publicada no GitHub Pages em https://educai2026.github.io/website/.
A identidade completa está em `trIA-identidade-visual/` (fonte da verdade; não editar os arquivos oficiais).

## Comandos
- `npm run dev` · `npm run build` · `npm run preview` (o site usa `base: '/website'`, abra `/website/`)
- Deploy: workflow `.github/workflows/deploy.yml` ao dar push na `main`.
- Link do formulário da lista de espera: `src/config.ts` (`FORM_URL`).

## Regras da marca (valem para qualquer texto ou tela)
- Escreva sempre **trIA** ("tr" minúsculo, "IA" maiúsculo). Nunca Tria, TRIA, TrIA.
- O **professor é o sujeito**: "você monta, revisa, decide". Não "a trIA gera".
- Proibido: "revolucionário", "incrível", "mágico", "a IA cria a prova por você", jargão (LLM, prompt, tokens).
- Algo não verificado deve ser dito como pendente. Nunca inventar depoimentos, números ou selos de verificação reais.
- "ENEM" só no posicionamento ("padrão ENEM"), nunca no nome.
- Cores só pelas variáveis de `src/styles/global.css` (copiadas de `04-cores/cores.css`). Vermelho em pouca área:
  no máximo um bloco de destaque e uma linha vermelha por página/peça. Sem gradientes, sombras, brilhos, robôs, cérebros, circuitos.
- Contraste mínimo 4,5:1. Estados (verificado/pendente/fonte) sempre com ícone + texto.
- Fontes: Archivo 800 só em títulos; Atkinson Hyperlegible no texto; Source Serif 4 nas questões. Fórmulas com KaTeX.
- Logo: usar só os arquivos oficiais, respeitando área de proteção e tamanho mínimo (96 px).
