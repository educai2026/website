import { icone } from '../lib/icones';
import { LETRAS } from '../data/questoes';

const raiz = document.querySelector<HTMLElement>('[data-demo]');
if (raiz) iniciar(raiz);

function iniciar(raiz: HTMLElement) {
  const um = <T extends HTMLElement = HTMLElement>(sel: string, el: ParentNode = raiz) => el.querySelector<T>(sel)!;
  const todos = <T extends HTMLElement = HTMLElement>(sel: string, el: ParentNode = raiz) => [...el.querySelectorAll<T>(sel)];

  const itens = todos('.dq');
  const porId = (id: string) => itens.find((li) => li.dataset.id === id)!;
  const filtros: Record<string, string> = { area: 'todas', nivel: 'todos' };
  const simulado: string[] = [];

  const dlg = um<HTMLDialogElement>('.fl');
  const titulo = um<HTMLInputElement>('#sm-titulo');
  const prof = um<HTMLInputElement>('#sm-prof');
  const comGabarito = um<HTMLInputElement>('#fl-gab');

  const plural = (n: number) => (n === 1 ? '1 questão' : `${n} questões`);

  /* filtros */
  function filtrar() {
    let n = 0;
    for (const li of itens) {
      const passa =
        (filtros.area === 'todas' || li.dataset.area === filtros.area) &&
        (filtros.nivel === 'todos' || li.dataset.nivel === filtros.nivel);
      li.hidden = !passa;
      if (passa) n++;
    }
    um('.demo-conta').textContent = plural(n);
    um('.demo-nada').hidden = n > 0;
  }

  function escolherFiltro(grupo: string, valor: string) {
    filtros[grupo] = valor;
    for (const chip of todos(`.chip[data-grupo="${grupo}"]`)) {
      chip.setAttribute('aria-pressed', String(chip.dataset.valor === valor));
    }
    filtrar();
  }

  /* abrir e recolher */
  function alternar(li: HTMLElement) {
    const aberta = li.classList.toggle('aberta');
    const bt = um('[data-acao="abrir"]', li);
    bt.setAttribute('aria-expanded', String(aberta));
    um('span', bt).textContent = aberta ? 'Recolher' : 'Ver questão';
    if (!aberta && li.classList.contains('editando')) editar(li);
  }

  /* edição do texto */
  function editar(li: HTMLElement) {
    const editando = li.classList.toggle('editando');
    for (const el of todos('[data-editavel]', li)) {
      if (editando) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('role', 'textbox');
        el.setAttribute('aria-label', 'Texto da questão, editável');
      } else {
        el.removeAttribute('contenteditable');
        el.removeAttribute('role');
        el.removeAttribute('aria-label');
      }
    }
    const bt = um('[data-acao="editar"]', li);
    um('span', bt).textContent = editando ? 'Concluir edição' : 'Editar texto';
    um('.dq-dica', li).hidden = !editando;
    if (editando) um('[data-editavel]', li).focus();
  }

  function marcarEditada(li: HTMLElement) {
    if (li.dataset.editada) return;
    li.dataset.editada = 'sim';
    todos('[data-estado]', li).forEach((selo, i) => {
      selo.className = 'selo selo-pend';
      selo.innerHTML = `${icone('pendente', 16)}<span>${i === 0 ? 'Pendente: texto editado' : 'Pendente'}</span>`;
    });
    um('.dq-aviso', li).hidden = false;
    desenharSimulado(); // a linha do simulado passa a mostrar "editada"
  }

  /* simulado */
  function alternarNoSimulado(id: string) {
    const i = simulado.indexOf(id);
    if (i >= 0) simulado.splice(i, 1);
    else simulado.push(id);
    desenharSimulado();
  }

  function mover(id: string, passo: number) {
    const i = simulado.indexOf(id);
    const j = i + passo;
    if (i < 0 || j < 0 || j >= simulado.length) return;
    [simulado[i], simulado[j]] = [simulado[j], simulado[i]];
    desenharSimulado();
    // devolve o foco ao botão equivalente da linha que se moveu
    const linha = todos('.sm-item')[j];
    const alvo = um<HTMLButtonElement>(`[data-acao="${passo < 0 ? 'subir' : 'descer'}"]`, linha);
    (alvo.disabled ? um<HTMLButtonElement>('.sm-bt:not(:disabled)', linha) : alvo).focus();
  }

  function botao(acao: string, id: string, nomeIcone: string, rotulo: string, desligado = false) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sm-bt';
    b.dataset.acao = acao;
    b.dataset.id = id;
    b.disabled = desligado;
    b.setAttribute('aria-label', rotulo);
    b.title = rotulo;
    b.innerHTML = icone(nomeIcone, 16);
    return b;
  }

  function desenharSimulado() {
    const lista = um('.sm-lista');
    lista.replaceChildren();
    simulado.forEach((id, i) => {
      const q = porId(id);
      const li = document.createElement('li');
      li.className = 'sm-item';

      const n = document.createElement('span');
      n.className = 'sm-n';
      n.textContent = String(i + 1);

      const t = document.createElement('span');
      t.className = 'sm-t';
      const forte = document.createElement('strong');
      forte.textContent = q.dataset.rotulo!;
      const detalhe = document.createElement('span');
      detalhe.textContent = q.dataset.detalhe! + (q.dataset.editada ? ' · editada' : '');
      t.append(forte, detalhe);

      const bts = document.createElement('span');
      bts.className = 'sm-bts';
      const nome = q.dataset.rotulo!;
      bts.append(
        botao('subir', id, 'cima', `Subir: ${nome}`, i === 0),
        botao('descer', id, 'baixo', `Descer: ${nome}`, i === simulado.length - 1),
        botao('remover', id, 'fechar', `Remover: ${nome}`),
      );

      li.append(n, t, bts);
      lista.append(li);
    });

    const n = simulado.length;
    um('.sm-conta').textContent = plural(n);
    um('[data-conta-curta]').textContent = String(n);
    um('.sm-vazio').hidden = n > 0;
    um<HTMLButtonElement>('.sm-ver').disabled = n === 0;

    for (const li of itens) {
      const dentro = simulado.includes(li.dataset.id!);
      const bt = um('[data-acao="adicionar"]', li);
      bt.setAttribute('aria-pressed', String(dentro));
      bt.innerHTML = `${icone(dentro ? 'feito' : 'mais', 16)}<span>${dentro ? 'No simulado' : 'Adicionar'}</span>`;
    }
  }

  /* folha A4 */
  function limpar<T extends Node>(no: T): T {
    if (no instanceof HTMLElement) {
      for (const el of [no, ...no.querySelectorAll<HTMLElement>('*')]) {
        for (const attr of ['contenteditable', 'role', 'aria-label', 'data-editavel', 'id']) el.removeAttribute(attr);
      }
    }
    return no;
  }

  function montarFolha() {
    const modelo = um<HTMLTemplateElement>('#folha-modelo');
    const folha = (modelo.content.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
    const n = simulado.length;

    um('[data-f="titulo"]', folha).textContent = titulo.value.trim() || 'Simulado';
    const nomeProf = prof.value.trim();
    um('[data-f="sub"]', folha).textContent = `Padrão ENEM · ${plural(n)}${nomeProf ? ` · Prof. ${nomeProf}` : ''}`;

    const area = um('.folha-qs', folha);
    const gabaritos: string[] = [];
    let algumaEditada = false;

    simulado.forEach((id, i) => {
      const q = porId(id);
      const numero = String(i + 1).padStart(2, '0');
      const art = document.createElement('article');
      art.className = 'folha-q';

      const h = document.createElement('h4');
      h.textContent = `QUESTÃO ${numero}`;
      art.append(h);

      for (const no of todos('.dq-enun > p, .dq-tabela, .dq-comando', q)) {
        const copia = limpar(no.cloneNode(true) as HTMLElement);
        copia.removeAttribute('class');
        art.append(copia);
      }

      const ol = document.createElement('ol');
      todos('.dq-alt', q).forEach((alt, j) => {
        const li = document.createElement('li');
        li.append(`(${LETRAS[j]}) `, ...limpar(alt.cloneNode(true) as HTMLElement).childNodes);
        ol.append(li);
      });
      art.append(ol);
      area.append(art);

      const editada = Boolean(q.dataset.editada);
      algumaEditada ||= editada;
      gabaritos.push(`${numero} ${q.dataset.gabarito}${editada ? '*' : ''}`);
    });

    const gab = um('.folha-gab', folha);
    gab.hidden = !comGabarito.checked;
    const rotulo = document.createElement('strong');
    rotulo.textContent = `GABARITO · ${titulo.value.trim() || 'Simulado'}`;
    gab.append(rotulo, gabaritos.join(' · '));
    if (algumaEditada) gab.append(' (* texto editado: confira o gabarito)');

    um('.fl-corpo').replaceChildren(folha);
  }

  function abrirFolha() {
    if (simulado.length === 0) return;
    montarFolha();
    dlg.showModal();
    um('.fl-corpo').scrollTop = 0;
  }

  function imprimir() {
    let alvo = document.querySelector<HTMLElement>('body > .so-impressao');
    if (!alvo) {
      alvo = document.createElement('div');
      alvo.className = 'so-impressao';
      document.body.append(alvo);
    }
    alvo.replaceChildren(um('.fl-corpo .folha').cloneNode(true));
    // a classe limita a troca da página pela folha a esta impressão (Ctrl+P segue imprimindo a página)
    const html = document.documentElement;
    html.classList.add('imprimindo-folha');
    window.addEventListener('afterprint', () => {
      html.classList.remove('imprimindo-folha');
      alvo.remove();
    }, { once: true });
    window.print();
  }

  /* vista em telas estreitas */
  function trocarVista(vista: string) {
    raiz.dataset.vista = vista;
    for (const b of todos('.demo-vista')) b.setAttribute('aria-pressed', String(b.dataset.vista === vista));
  }

  /* eventos */
  raiz.addEventListener('click', (e) => {
    const origem = e.target as Element;
    if (origem === dlg) return dlg.close(); // clique fora da folha

    const chip = origem.closest<HTMLElement>('.chip');
    if (chip) return escolherFiltro(chip.dataset.grupo!, chip.dataset.valor!);

    const vista = origem.closest<HTMLElement>('.demo-vista');
    if (vista) return trocarVista(vista.dataset.vista!);

    const alvo = origem.closest<HTMLElement>('[data-acao]');
    if (!alvo) return;
    const li = alvo.closest<HTMLElement>('.dq');

    switch (alvo.dataset.acao) {
      case 'abrir': return alternar(li!);
      case 'editar': return editar(li!);
      case 'adicionar': return alternarNoSimulado(li!.dataset.id!);
      case 'remover': {
        alternarNoSimulado(alvo.dataset.id!);
        return (um<HTMLButtonElement>('.sm-bt:not(:disabled)') ?? titulo).focus();
      }
      case 'subir': return mover(alvo.dataset.id!, -1);
      case 'descer': return mover(alvo.dataset.id!, 1);
      case 'limpar': escolherFiltro('area', 'todas'); return escolherFiltro('nivel', 'todos');
      case 'folha': return abrirFolha();
      case 'fechar-folha': return dlg.close();
      case 'imprimir': return imprimir();
    }
  });

  raiz.addEventListener('input', (e) => {
    const li = (e.target as Element).closest<HTMLElement>('.dq.editando');
    if (li) marcarEditada(li);
  });

  // colar sempre como texto simples, para não trazer formatação de fora
  raiz.addEventListener('paste', (e) => {
    const alvo = (e.target as Element).closest('[contenteditable="true"]');
    if (!alvo) return;
    e.preventDefault();
    const texto = e.clipboardData?.getData('text/plain') ?? '';
    document.execCommand('insertText', false, texto.replace(/\s*\n\s*/g, ' '));
  });

  // Enter conclui a edição do trecho em vez de quebrar a linha
  raiz.addEventListener('keydown', (e) => {
    const alvo = (e.target as Element).closest<HTMLElement>('[contenteditable="true"]');
    if (alvo && e.key === 'Enter') {
      e.preventDefault();
      alvo.blur();
    }
  });

  comGabarito.addEventListener('change', () => {
    const gab = dlg.querySelector<HTMLElement>('.folha-gab');
    if (gab) gab.hidden = !comGabarito.checked;
  });

  desenharSimulado();
}
