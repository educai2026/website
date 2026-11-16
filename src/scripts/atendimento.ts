import { duvidas, roteiro, semResposta, despedida, type Opcao } from '../data/atendimento';
import { FORM_URL } from '../config';
import { icone } from '../lib/icones';

const painel = document.querySelector<HTMLElement>('#atendimento');
const lancador = document.querySelector<HTMLButtonElement>('.at-botao');
if (painel && lancador) iniciar(painel, lancador);

function iniciar(painel: HTMLElement, lancador: HTMLButtonElement) {
  const log = painel.querySelector<HTMLElement>('.at-log')!;
  const form = painel.querySelector<HTMLFormElement>('.at-form')!;
  const campo = painel.querySelector<HTMLInputElement>('#at-texto')!;
  let comecou = false;
  let quemAbriu: HTMLElement = lancador;

  const rolar = () => { log.scrollTop = log.scrollHeight; };

  function fala(texto: string, de: 'bot' | 'eu') {
    const p = document.createElement('p');
    p.className = `at-msg ${de}`;
    p.textContent = texto;
    if (de === 'eu') {
      const quem = document.createElement('span');
      quem.className = 'sr';
      quem.textContent = 'Você: ';
      p.prepend(quem);
    }
    log.append(p);
  }

  function tirarOpcoes() {
    const grupo = log.querySelector('.at-opcoes');
    if (!grupo) return;
    // se o foco estava em uma opção, ele fica na conversa em vez de cair para fora do painel
    if (grupo.contains(document.activeElement)) log.focus({ preventScroll: true });
    grupo.remove();
  }

  function mostrarOpcoes(opcoes: Opcao[]) {
    if (opcoes.length === 0) return;
    const grupo = document.createElement('div');
    grupo.className = 'at-opcoes';
    grupo.setAttribute('role', 'group');
    grupo.setAttribute('aria-label', 'Opções de resposta');
    for (const op of opcoes) {
      let el: HTMLElement;
      if (op.acao === 'formulario') {
        // link de verdade: abre o formulário em outra aba, mesmo dentro de um quadro
        const a = document.createElement('a');
        a.href = FORM_URL;
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = `<span></span>${icone('fora', 16)}<span class="sr"> (abre em nova aba)</span>`;
        a.querySelector('span')!.textContent = op.rotulo;
        el = a;
      } else {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = op.rotulo;
        el = b;
      }
      el.classList.add('at-op');
      el.addEventListener('click', () => escolher(op));
      grupo.append(el);
    }
    log.append(grupo);
  }

  function passo(nome: string) {
    const p = roteiro[nome];
    if (!p) return;
    p.falas.forEach((f) => fala(f, 'bot'));
    mostrarOpcoes(p.opcoes);
    rolar();
  }

  function responderDuvida(id: string) {
    const d = duvidas.find((x) => x.id === id);
    if (!d) return passo('naoEntendi');
    fala(d.resposta, 'bot');
    passo('depois');
  }

  function escolher(op: Opcao) {
    tirarOpcoes();
    fala(op.rotulo, 'eu');
    if (op.duvida) return responderDuvida(op.duvida);
    if (op.vai) return passo(op.vai);
    switch (op.acao) {
      case 'formulario':
        fala('O formulário abre em outra aba.', 'bot');
        return passo('depois');
      case 'demo':
        fala('A demonstração fica na própria página. Levei você até lá.', 'bot');
        passo('depois'); // ao reabrir, a conversa continua com opções
        fechar(false);
        document.querySelector('#demo')?.scrollIntoView();
        return document.querySelector<HTMLElement>('#demo-t')?.focus({ preventScroll: true });
      case 'encerrar':
        fala(despedida, 'bot');
        mostrarOpcoes([{ rotulo: 'Recomeçar', vai: 'inicio' }]);
        return rolar();
    }
  }

  const normalizar = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ');

  function responderTexto(texto: string) {
    const palavras = new Set(normalizar(texto).split(/\s+/).filter(Boolean));
    const tem = (chaves: string[]) => chaves.filter((c) => palavras.has(c)).length;

    // cumprimento: só quando a mensagem inteira é um cumprimento ("oi", "bom dia", "olá, tudo bem")
    const cumprimento = ['oi', 'ola', 'opa', 'hello', 'bom', 'boa', 'dia', 'tarde', 'noite', 'tudo', 'bem'];
    if (palavras.size > 0 && [...palavras].every((p) => cumprimento.includes(p))) return passo('inicio');

    let melhor = '';
    let pontos = 0;
    for (const d of duvidas) {
      const n = tem(d.chaves);
      if (n > pontos) [melhor, pontos] = [d.id, n];
    }

    // temas sem resposta pronta (preço) só vencem quando nenhuma dúvida combina melhor
    const fora = semResposta.find((s) => tem(s.chaves) >= Math.max(pontos, 1));
    if (fora) {
      fala(fora.resposta, 'bot');
      return passo('depois');
    }
    if (melhor) return responderDuvida(melhor);
    passo('naoEntendi');
  }

  function abrir(origem: HTMLElement) {
    quemAbriu = origem;
    painel.hidden = false;
    lancador.hidden = true;
    lancador.setAttribute('aria-expanded', 'true');
    if (!comecou) {
      comecou = true;
      passo('inicio');
    }
    painel.querySelector<HTMLElement>('.at-fechar')!.focus();
    rolar();
  }

  function fechar(devolverFoco = true) {
    painel.hidden = true;
    lancador.hidden = false;
    lancador.setAttribute('aria-expanded', 'false');
    if (devolverFoco) (quemAbriu.isConnected ? quemAbriu : lancador).focus();
  }

  document.addEventListener('click', (e) => {
    const alvo = (e.target as Element).closest<HTMLElement>('[data-abrir-atendimento]');
    if (alvo) abrir(alvo);
  });
  painel.querySelector('[data-fechar-atendimento]')!.addEventListener('click', () => fechar());
  // Esc fecha o painel de qualquer lugar, desde que não haja uma janela modal (a folha) por cima
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !painel.hidden && !document.querySelector('dialog[open]')) fechar();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = campo.value.trim();
    if (!texto) return;
    campo.value = '';
    tirarOpcoes();
    fala(texto, 'eu');
    responderTexto(texto);
  });
}
