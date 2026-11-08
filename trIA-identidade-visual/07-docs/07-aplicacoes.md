# 07 · Aplicações e arquivos

## Redes sociais

| Arquivo | Tamanho | Uso |
|---|---|---|
| `instagram-foto-de-perfil-1080.png` | 1080 × 1080 | Foto de perfil do Instagram, WhatsApp e LinkedIn. O logo fica no miolo, então não é cortado pelo círculo |
| `instagram-post-questao-1080x1350.png` | 1080 × 1350 (4:5) | Modelo de “Questão da semana”. Substitua os campos `[ ]` |
| `instagram-post-manifesto-1080.png` | 1080 × 1080 | Post de apresentação da marca |
| `linkedin-capa-1584x396.png` | 1584 × 396 | Capa da página no LinkedIn. O texto fica à direita, longe da foto de perfil |

## Documentos

| Arquivo | Uso |
|---|---|
| `cabecalho-simulado-A4.pdf` / `.png` | Modelo de simulado em A4, **só preto**, pensado para xerox |
| `assinatura-email-520x150.png` | Assinatura de e-mail. Substitua `[Seu nome]`, `[Cargo]`, `[site]` |

## Ícones e site

| Arquivo | Uso |
|---|---|
| `trIA-icone-1024.png` | Lojas de apps, ícone grande |
| `trIA-icone-512.png`, `-192.png` | PWA e manifest do site |
| `apple-touch-icon-180.png` | Atalho na tela inicial do iPhone |
| `favicon.svg`, `favicon-32.png`, `favicon-16.png` | Aba do navegador |

Código para o `<head>` do site:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta name="theme-color" content="#13254A">
```

## Regras para novas peças

1. Comece pelo fundo: marinho, branco-papel ou branco.
2. Coloque o logo em um canto, respeitando a área de proteção.
3. Use no máximo **uma** linha (azul ou vermelha) e **um** bloco de destaque.
4. Títulos em Archivo, texto em Atkinson e questões em Source Serif.
5. Confira o contraste de todo texto (mínimo 4,5:1).
6. Para impressão escolar, teste em **preto e branco** antes.
