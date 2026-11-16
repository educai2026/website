// Dúvidas comuns (seção da página) e roteiro do atendimento.
// O atendimento é um roteiro fixo: não chama nenhuma API e não guarda o que a pessoa responde.

export interface Duvida {
  id: string;
  pergunta: string;
  resposta: string;
  chaves: string[]; // palavras, sem acento, que levam a esta resposta quando a pessoa digita
  naPagina?: boolean; // aparece também na seção de dúvidas
}

export const duvidas: Duvida[] = [
  {
    id: 'monta',
    pergunta: 'A trIA monta a prova no meu lugar?',
    resposta:
      'Não. Você escolhe a habilidade, revisa cada questão e decide o que entra. A trIA sugere e mostra de onde tirou; o material final é seu.',
    chaves: ['monta', 'sozinha', 'lugar', 'substitui', 'automatico', 'automatica', 'cria', 'gera', 'pronta'],
    naPagina: true,
  },
  {
    id: 'correta',
    pergunta: 'Como sei se uma questão está correta?',
    resposta:
      'Cada questão traz gabarito, resolução e fonte à vista, com um estado: verificado, pendente ou fonte citada. O que ainda não foi checado aparece como pendente, e a revisão final é sempre sua.',
    chaves: ['correta', 'certa', 'errada', 'erro', 'erros', 'gabarito', 'confiar', 'confiavel', 'verificado', 'conferir', 'resolucao'],
    naPagina: true,
  },
  {
    id: 'editar',
    pergunta: 'Posso mudar o texto das questões?',
    resposta:
      'Pode. Você ajusta o enunciado e as alternativas. Quando o texto muda, a questão volta para pendente até você conferir o gabarito de novo.',
    chaves: ['editar', 'alterar', 'mudar', 'ajustar', 'adaptar', 'trocar', 'modificar', 'personalizar'],
    naPagina: true,
  },
  {
    id: 'similaridade',
    pergunta: 'O que é a taxa de similaridade?',
    resposta:
      'É um indicador de quanto a questão se aproxima dos itens do ENEM em estrutura e habilidade. Na demonstração desta página, os percentuais são ilustrativos.',
    chaves: ['similaridade', 'taxa', 'porcentagem', 'percentual', 'parecida', 'semelhanca', 'semelhante'],
    naPagina: true,
  },
  {
    id: 'areas',
    pergunta: 'Quais áreas a trIA cobre?',
    resposta: 'Começamos por Matemática e Ciências da Natureza, no padrão do ENEM.',
    chaves: ['area', 'areas', 'disciplina', 'disciplinas', 'materia', 'materias', 'matematica', 'fisica', 'quimica', 'biologia', 'portugues', 'linguagens', 'humanas', 'redacao'],
    naPagina: true,
  },
  {
    id: 'imprimir',
    pergunta: 'Dá para imprimir o simulado?',
    resposta: 'Dá. O simulado sai em folha A4, só em preto, pensada para a copiadora da escola.',
    chaves: ['imprimir', 'impressao', 'xerox', 'copiadora', 'pdf', 'papel', 'folha', 'impresso'],
  },
  {
    id: 'usar',
    pergunta: 'Já posso usar?',
    resposta:
      'Ainda não. A trIA está em desenvolvimento. Quem entra na lista de espera é avisado quando houver novidades.',
    chaves: ['usar', 'acesso', 'acessar', 'cadastro', 'cadastrar', 'login', 'conta', 'quando', 'lancamento', 'abrir', 'disponivel', 'testar', 'comecar'],
    naPagina: true,
  },
  {
    id: 'inep',
    pergunta: 'A trIA tem ligação com o INEP?',
    resposta:
      'Não. O ENEM é um exame do INEP. A trIA segue o padrão das questões do exame, mas não é afiliada ao INEP.',
    chaves: ['inep', 'oficial', 'governo', 'mec', 'ligacao', 'afiliada'],
    naPagina: true,
  },
];

// Termos sem resposta pronta, com saída honesta.
export const semResposta = [
  {
    chaves: ['preco', 'precos', 'custa', 'custo', 'valor', 'valores', 'pagar', 'pago', 'gratis', 'gratuito', 'gratuita', 'plano', 'planos', 'mensalidade', 'assinatura'],
    resposta: 'Os valores ainda não foram divulgados. As novidades saem pela lista de espera.',
  },
];

export interface Opcao {
  rotulo: string;
  vai?: string; // próximo passo do roteiro
  duvida?: string; // id de uma dúvida
  acao?: 'formulario' | 'demo' | 'encerrar';
}

export interface Passo {
  falas: string[];
  opcoes: Opcao[];
}

const convite: Opcao[] = [
  { rotulo: 'Entrar na lista de espera', acao: 'formulario' },
  { rotulo: 'Ver a demonstração', acao: 'demo' },
  { rotulo: 'Tenho uma dúvida', vai: 'duvidas' },
];

export const roteiro: Record<string, Passo> = {
  inicio: {
    falas: ['Olá! Este é o atendimento da trIA.', 'Escolha uma opção ou escreva a sua dúvida.'],
    opcoes: [
      { rotulo: 'Sou professor(a)', vai: 'professor' },
      { rotulo: 'Sou da coordenação ou da gestão', vai: 'gestao' },
      { rotulo: 'Quero entender a trIA', vai: 'oque' },
      { rotulo: 'Tenho uma dúvida', vai: 'duvidas' },
    ],
  },
  professor: {
    falas: ['Que bom ter você por aqui. Qual é a sua área?'],
    opcoes: [
      { rotulo: 'Matemática', vai: 'rede' },
      { rotulo: 'Física, Química ou Biologia', vai: 'rede' },
      { rotulo: 'Outra área', vai: 'outra' },
    ],
  },
  rede: {
    falas: ['A trIA começa justamente por Matemática e Ciências da Natureza.', 'Em qual rede você dá aula?'],
    opcoes: [
      { rotulo: 'Pública', vai: 'convite' },
      { rotulo: 'Privada', vai: 'convite' },
      { rotulo: 'Nas duas', vai: 'convite' },
    ],
  },
  outra: {
    falas: [
      'Por enquanto começamos por Matemática e Ciências da Natureza.',
      'Você pode entrar na lista de espera e contar qual é a sua área.',
    ],
    opcoes: convite,
  },
  convite: {
    falas: [
      'Quer ser avisado(a) quando a trIA abrir? O contato é pelo formulário da lista de espera.',
      'O que você respondeu aqui não fica salvo.',
    ],
    opcoes: convite,
  },
  gestao: {
    falas: [
      'Com a trIA, cada professor monta o próprio simulado, e a escola recebe material com gabarito, resolução e fonte à vista.',
      'Você pode deixar o contato da escola na lista de espera.',
    ],
    opcoes: convite,
  },
  oque: {
    falas: [
      'A trIA ajuda professores a criar questões e simulados no padrão ENEM.',
      'Você escolhe a habilidade, revisa cada questão e monta a prova. Gabarito, resolução e fonte ficam à vista.',
    ],
    opcoes: [
      { rotulo: 'Ver a demonstração', acao: 'demo' },
      { rotulo: 'Já posso usar?', duvida: 'usar' },
      { rotulo: 'Tenho outra dúvida', vai: 'duvidas' },
    ],
  },
  duvidas: {
    falas: ['Qual destas é a sua dúvida?'],
    opcoes: [
      { rotulo: 'A trIA monta a prova no meu lugar?', duvida: 'monta' },
      { rotulo: 'Como sei se uma questão está correta?', duvida: 'correta' },
      { rotulo: 'O que é a taxa de similaridade?', duvida: 'similaridade' },
      { rotulo: 'Posso mudar o texto das questões?', duvida: 'editar' },
      { rotulo: 'Dá para imprimir o simulado?', duvida: 'imprimir' },
      { rotulo: 'Já posso usar?', duvida: 'usar' },
    ],
  },
  depois: {
    falas: ['Ajudo em mais alguma coisa?'],
    opcoes: [
      { rotulo: 'Tenho outra dúvida', vai: 'duvidas' },
      { rotulo: 'Entrar na lista de espera', acao: 'formulario' },
      { rotulo: 'Era só isso', acao: 'encerrar' },
    ],
  },
  naoEntendi: {
    falas: ['Não tenho uma resposta pronta para isso. Veja se um destes temas ajuda.'],
    opcoes: [
      { rotulo: 'A trIA monta a prova no meu lugar?', duvida: 'monta' },
      { rotulo: 'Como sei se uma questão está correta?', duvida: 'correta' },
      { rotulo: 'Quais áreas a trIA cobre?', duvida: 'areas' },
      { rotulo: 'Já posso usar?', duvida: 'usar' },
      { rotulo: 'Entrar na lista de espera', acao: 'formulario' },
    ],
  },
};

export const despedida = 'Obrigado pela visita. Se precisar, é só abrir o atendimento de novo.';
