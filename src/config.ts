// Link público do Google Forms da lista de espera (termina em /viewform, não em /edit).
export const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfODZ1pX0wDliUFwCjGWx1q22jCTsNzzzFVWeQz7b5RYgDC0A/viewform';
export const SITE_TITLE = 'trIA · Questões e simulados no padrão ENEM, criados com o professor';
export const SITE_DESC =
  'A trIA apoia professores a criar questões e simulados no padrão ENEM, com fontes, gabaritos e resoluções à vista. Você revisa, ajusta e assina.';

// Opcionais. Enquanto estiverem vazios, o que dependem deles não aparece no site.
// Contato e responsável pelos dados da lista de espera (aparecem na página /privacidade e no rodapé).
export const PRIVACIDADE = { responsavel: '', email: '' };
// Código do GoatCounter (contador de visitas sem cookies). Ex.: 'tria' para tria.goatcounter.com.
export const GOATCOUNTER = '';

// Build do mockup (página única para compartilhar): PUBLIC_MOCKUP=1 npm run build
export const MOCKUP = import.meta.env.PUBLIC_MOCKUP === '1';
