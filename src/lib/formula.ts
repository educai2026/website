import katex from 'katex';

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Converte um texto com fórmulas entre \( e \) em HTML, com KaTeX renderizado no build. */
export function rico(texto: string): string {
  return texto
    .split(/(\\\(.+?\\\))/g)
    .map((parte) => {
      if (parte.startsWith('\\(') && parte.endsWith('\\)')) {
        const html = katex.renderToString(parte.slice(2, -2), { throwOnError: true, output: 'html' });
        // contenteditable=false: ao editar o enunciado, a fórmula se comporta como um bloco único.
        return `<span class="formula" contenteditable="false">${html}</span>`;
      }
      return escapar(parte);
    })
    .join('');
}
