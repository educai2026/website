// Ícones de traço, 24×24, mesma espessura das linhas da marca. Usados no build e no navegador.
const tracos: Record<string, string> = {
  verificado: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
  pendente: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.4v.6"/>',
  fonte: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  feito: '<path d="M4 12.5l5 5L20 6.5"/>',
  abrir: '<path d="M6 9l6 6 6-6"/>',
  cima: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  baixo: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  imprimir: '<path d="M7 8V3h10v5M7 17H4V8h16v9h-3"/><path d="M7 14h10v7H7z"/>',
  conversa: '<path d="M4 5h16v11H9l-5 4z"/>',
  enviar: '<path d="M4 12h14M12 6l6 6-6 6"/>',
  lapis: '<path d="M4 20l1-5L16 4l4 4L9 19z"/>',
  folha: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  fora: '<path d="M9 5H5v14h14v-4M13 5h6v6M19 5l-9 9"/>',
};

export function icone(nome: keyof typeof tracos | string, tamanho = 18): string {
  return `<svg class="ic" width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false">${tracos[nome] ?? ''}</svg>`;
}
