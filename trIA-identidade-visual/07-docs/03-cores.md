# 03 · Cores

A paleta vem da **bandeira de Alagoas**: um tricolor vertical vermelho, branco e azul. O azul-marinho foi adicionado como cor de base, para dar sobriedade e legibilidade.

## Cores da marca

| Cor | HEX | RGB | CMYK (aprox.) | Uso |
|---|---|---|---|---|
| Azul-marinho trIA | `#13254A` | 19 37 74 | 74 50 0 71 | Cor principal: textos, fundos institucionais, o “tr” do logo |
| Vermelho Alagoas | `#C8102E` | 200 16 46 | 0 92 77 22 | Destaque: o bloco do “IA”. Usar em pouca área |
| Azul Alagoas | `#1D4E9E` | 29 78 158 | 82 51 0 38 | Apoio: links, a linha do “TRI”, gráficos, fontes citadas |
| Branco | `#FFFFFF` | 255 255 255 | 0 0 0 0 | Documentos e letras sobre o vermelho |
| Branco-papel | `#FBFAF7` | 251 250 247 | 0 0 2 2 | Fundo de telas e peças digitais claras |

## Neutros

| Cor | HEX | Uso |
|---|---|---|
| Cinza texto | `#55606A` | Legendas, metadados, texto secundário |
| Cinza linha | `#D9DCE3` | Bordas, divisórias, campos |
| Névoa | `#EDF0F5` | Fundos de seção e cartões |

## Cores de estado (produto)

Essas cores levam o compromisso de **transparência** para a interface.

| Estado | HEX | Significado |
|---|---|---|
| Verificado | `#1F7A4D` | Conteúdo checado (gabarito, fonte, cálculo) |
| Pendente | `#8A5A00` | Precisa de revisão do professor |
| Fonte citada | `#1D4E9E` | Referência ou evidência vinculada |

Cada estado aparece sempre com **ícone e texto**, nunca só com a cor. Erros de sistema usam ícone e mensagem em marinho, para não confundir com o vermelho da marca.

## Proporção

**60% marinho · 25% branco · 10% azul · 5% vermelho**

O vermelho é forte e, na escola, lembra caneta de correção. Por isso ele aparece **pouco**: no bloco do “IA” e em, no máximo, um destaque por peça.

## Contraste (texto)

| Combinação | Contraste | Pode usar para texto? |
|---|---|---|
| Branco sobre marinho | 15,1:1 | ✅ |
| Marinho sobre branco-papel | 14,5:1 | ✅ |
| Branco sobre azul Alagoas | 8,0:1 | ✅ |
| Branco sobre vermelho | 5,9:1 | ✅ (textos curtos) |
| Vermelho sobre marinho | 2,6:1 | ❌ |
| Azul sobre marinho | 1,9:1 | ❌ |

A regra é contraste mínimo de 4,5:1 para qualquer texto (WCAG AA).

## Arquivos

- `04-cores/paleta.png`: referência visual
- `04-cores/tokens.json`: todas as cores com HEX, RGB, CMYK e uso
- `04-cores/cores.css`: variáveis prontas (`var(--tria-marinho)` etc.)

Os valores CMYK são conversões aproximadas. Antes de imprimir em gráfica, peça uma prova de cor.
