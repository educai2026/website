// Questões de exemplo da demonstração.
// Fórmulas ficam entre \( e \) e são renderizadas com KaTeX no build.
// Estados e taxa de similaridade são ILUSTRATIVOS: servem para mostrar a interface.
// Toda questão nova precisa de revisão de um professor antes de ir ao ar.

export type Nivel = 'facil' | 'medio' | 'dificil';
export type Area = 'mat' | 'cn';
export type Estado = 'verificado' | 'pendente';

export interface Questao {
  id: string;
  area: Area;
  disciplina: string;
  assunto: string;
  hab: string;
  habTexto: string;
  nivel: Nivel;
  enunciado: string[];
  tabela?: { cabecalho: string[]; linhas: string[][] };
  comando: string;
  alternativas: string[];
  gabarito: number;
  resolucao: string[];
  distratores: Record<string, string>;
  similaridade: number;
  estado: Estado;
}

export const AREAS: Record<Area, string> = {
  mat: 'Matemática',
  cn: 'Ciências da Natureza',
};

export const NIVEIS: Record<Nivel, string> = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

export const LETRAS = ['A', 'B', 'C', 'D', 'E'];

// Textos das habilidades conforme a Matriz de Referência do ENEM (Inep).
const H = {
  mat8: 'Resolver situação-problema que envolva conhecimentos geométricos de espaço e forma.',
  mat16: 'Resolver situação-problema envolvendo a variação de grandezas, direta ou inversamente proporcionais.',
  mat21: 'Resolver situação-problema cuja modelagem envolva conhecimentos algébricos.',
  mat27:
    'Calcular medidas de tendência central ou de dispersão de um conjunto de dados expressos em uma tabela de frequências de dados agrupados (não em classes) ou em gráficos.',
  cn5: 'Dimensionar circuitos ou dispositivos elétricos de uso cotidiano.',
  cn13: 'Reconhecer mecanismos de transmissão da vida, prevendo ou explicando a manifestação de características dos seres vivos.',
  cn17:
    'Relacionar informações apresentadas em diferentes formas de linguagem e representação usadas nas ciências físicas, químicas ou biológicas, como texto discursivo, gráficos, tabelas, relações matemáticas ou linguagem simbólica.',
};

export const questoes: Questao[] = [
  {
    id: 'patio-circular',
    area: 'mat',
    disciplina: 'Matemática',
    assunto: 'Geometria plana',
    hab: 'H8',
    habTexto: H.mat8,
    nivel: 'facil',
    enunciado: [
      'Uma escola vai revestir com piso emborrachado um pátio circular de 4 m de raio. A empresa contratada cobra pela área revestida e adota \\(\\pi = 3\\) em seus orçamentos.',
    ],
    comando: 'Quantos metros quadrados de piso a escola deve encomendar?',
    alternativas: ['24 m²', '48 m²', '64 m²', '96 m²', '192 m²'],
    gabarito: 1,
    resolucao: [
      'A área do círculo é \\(A = \\pi r^{2}\\).',
      'Com \\(r = 4\\) e \\(\\pi = 3\\): \\(A = 3 \\cdot 4^{2} = 3 \\cdot 16 = 48\\) m².',
    ],
    distratores: {
      A: 'Vem de \\(2\\pi r\\), que é o comprimento da borda do pátio, não a área.',
      C: 'Eleva o diâmetro (8 m) ao quadrado e não multiplica por \\(\\pi\\).',
      D: 'É o dobro da área correta.',
      E: 'Usa o diâmetro no lugar do raio: \\(3 \\cdot 8^{2} = 192\\).',
    },
    similaridade: 91,
    estado: 'verificado',
  },
  {
    id: 'corrida-aplicativo',
    area: 'mat',
    disciplina: 'Matemática',
    assunto: 'Função afim',
    hab: 'H21',
    habTexto: H.mat21,
    nivel: 'facil',
    enunciado: [
      'Um aplicativo de transporte cobra R$ 5,00 fixos por corrida e mais R$ 2,00 por quilômetro rodado. Uma professora pagou R$ 29,00 pela corrida de casa até a escola.',
    ],
    comando: 'Quantos quilômetros ela percorreu?',
    alternativas: ['12 km', '14,5 km', '17 km', '24 km', '48 km'],
    gabarito: 0,
    resolucao: [
      'O valor pago é \\(V = 5 + 2d\\), em que \\(d\\) é a distância em quilômetros.',
      'Com \\(V = 29\\): \\(2d = 29 - 5 = 24\\), logo \\(d = 12\\) km.',
    ],
    distratores: {
      B: 'Divide 29 por 2 sem descontar a parte fixa.',
      C: 'Soma a parte fixa em vez de subtrair: \\((29 + 5) \\div 2 = 17\\).',
      D: 'Desconta a parte fixa, mas não divide pelo preço do quilômetro.',
      E: 'Multiplica 24 por 2 em vez de dividir.',
    },
    similaridade: 88,
    estado: 'verificado',
  },
  {
    id: 'impressao-simulado',
    area: 'mat',
    disciplina: 'Matemática',
    assunto: 'Proporcionalidade',
    hab: 'H16',
    habTexto: H.mat16,
    nivel: 'medio',
    enunciado: [
      'A impressora de uma escola imprime 48 páginas a cada 3 minutos. Uma professora precisa imprimir um simulado de 12 páginas para cada um de seus 40 estudantes.',
    ],
    comando: 'Mantido esse ritmo, quantos minutos a impressão vai levar?',
    alternativas: ['2,5 min', '10 min', '16 min', '30 min', '90 min'],
    gabarito: 3,
    resolucao: [
      'São \\(12 \\cdot 40 = 480\\) páginas.',
      'A impressora faz \\(48 \\div 3 = 16\\) páginas por minuto.',
      'Tempo: \\(480 \\div 16 = 30\\) minutos.',
    ],
    distratores: {
      A: 'Divide os 40 estudantes por 16, sem contar as 12 páginas de cada prova.',
      B: 'Divide 480 por 48, como se a impressora fizesse 48 páginas por minuto.',
      C: 'É o ritmo da impressora, em páginas por minuto, e não o tempo.',
      E: 'Trata as 16 páginas como feitas a cada 3 minutos, e não a cada minuto.',
    },
    similaridade: 84,
    estado: 'verificado',
  },
  {
    id: 'notas-turma',
    area: 'mat',
    disciplina: 'Matemática',
    assunto: 'Estatística',
    hab: 'H27',
    habTexto: H.mat27,
    nivel: 'medio',
    enunciado: ['A tabela mostra as notas dos 20 estudantes de uma turma em um simulado.'],
    tabela: {
      cabecalho: ['Nota', 'Estudantes'],
      linhas: [
        ['4', '3'],
        ['6', '5'],
        ['7', '8'],
        ['9', '4'],
      ],
    },
    comando: 'Qual foi a média das notas da turma?',
    alternativas: ['5,0', '6,5', '6,7', '7,0', '8,0'],
    gabarito: 2,
    resolucao: [
      'Cada nota entra na conta tantas vezes quantos estudantes a tiraram: \\(4 \\cdot 3 + 6 \\cdot 5 + 7 \\cdot 8 + 9 \\cdot 4 = 134\\).',
      'Dividindo pelo total de estudantes: \\(134 \\div 20 = 6{,}7\\).',
    ],
    distratores: {
      A: 'É a média das quantidades de estudantes (\\(20 \\div 4\\)), e não das notas.',
      B: 'É a média simples das quatro notas, sem considerar quantos estudantes tiraram cada uma.',
      D: 'É a moda, a nota mais frequente.',
      E: 'É a maior frequência da tabela (8 estudantes), lida como se fosse nota.',
    },
    similaridade: 86,
    estado: 'verificado',
  },
  {
    id: 'caixa-dagua',
    area: 'mat',
    disciplina: 'Matemática',
    assunto: 'Geometria espacial',
    hab: 'H8',
    habTexto: H.mat8,
    nivel: 'dificil',
    enunciado: [
      'A caixa-d’água de uma escola tem formato cilíndrico, com 1 m de raio e 2 m de altura, e está completamente cheia. A escola consome, em média, 300 litros de água por dia. Adote \\(\\pi = 3\\).',
    ],
    comando: 'Sem reabastecimento, por quantos dias essa água é suficiente?',
    alternativas: ['2 dias', '10 dias', '20 dias', '40 dias', '80 dias'],
    gabarito: 2,
    resolucao: [
      'Volume do cilindro: \\(V = \\pi r^{2} h = 3 \\cdot 1^{2} \\cdot 2 = 6\\) m³.',
      'Como 1 m³ equivale a 1 000 litros, a caixa guarda 6 000 litros.',
      'Duração: \\(6\\,000 \\div 300 = 20\\) dias.',
    ],
    distratores: {
      A: 'Converte 1 m³ em 100 litros: \\(600 \\div 300 = 2\\).',
      B: 'Esquece a altura e usa só a área da base: 3 m³.',
      D: 'Usa \\(2\\pi r h\\), que é a área lateral do cilindro, no lugar do volume.',
      E: 'Usa o diâmetro (2 m) como raio: \\(3 \\cdot 2^{2} \\cdot 2 = 24\\) m³.',
    },
    similaridade: 79,
    estado: 'pendente',
  },
  {
    id: 'chuveiro',
    area: 'cn',
    disciplina: 'Física',
    assunto: 'Energia elétrica',
    hab: 'H5',
    habTexto: H.cn5,
    nivel: 'medio',
    enunciado: ['Um chuveiro elétrico de 5 500 W de potência é usado, em média, 30 minutos por dia em uma residência.'],
    comando: 'Qual é o consumo de energia desse chuveiro em 30 dias?',
    alternativas: ['2,75 kWh', '82,5 kWh', '165 kWh', '4 950 kWh', '82 500 kWh'],
    gabarito: 1,
    resolucao: [
      'Potência em quilowatts: \\(5\\,500\\ \\text{W} = 5{,}5\\ \\text{kW}\\).',
      'Tempo de uso no período: \\(0{,}5\\ \\text{h} \\cdot 30 = 15\\ \\text{h}\\).',
      'Energia: \\(E = P \\cdot t = 5{,}5 \\cdot 15 = 82{,}5\\) kWh.',
    ],
    distratores: {
      A: 'É o consumo de um único dia.',
      C: 'Considera 1 hora de uso por dia.',
      D: 'Usa os 30 minutos como se fossem 30 horas por dia.',
      E: 'Não converte watts em quilowatts.',
    },
    similaridade: 90,
    estado: 'verificado',
  },
  {
    id: 'ervilhas',
    area: 'cn',
    disciplina: 'Biologia',
    assunto: 'Genética',
    hab: 'H13',
    habTexto: H.cn13,
    nivel: 'facil',
    enunciado: [
      'Em ervilhas, a cor amarela da semente é determinada por um alelo dominante (V) e a cor verde, por um alelo recessivo (v). Duas plantas heterozigotas (Vv) foram cruzadas.',
    ],
    comando: 'Qual é a probabilidade de um descendente desse cruzamento ter sementes verdes?',
    alternativas: ['0%', '25%', '50%', '75%', '100%'],
    gabarito: 1,
    resolucao: [
      'O cruzamento Vv × Vv produz os genótipos VV, Vv, Vv e vv, todos com a mesma chance.',
      'Só o genótipo vv dá sementes verdes: 1 caso em 4, ou 25%.',
    ],
    distratores: {
      A: 'Supõe que o alelo recessivo nunca se manifesta.',
      C: 'É a proporção de descendentes heterozigotos (Vv).',
      D: 'É a probabilidade de sementes amarelas.',
      E: 'Só aconteceria se as duas plantas fossem vv.',
    },
    similaridade: 93,
    estado: 'verificado',
  },
  {
    id: 'isotonico',
    area: 'cn',
    disciplina: 'Química',
    assunto: 'Concentração de soluções',
    hab: 'H17',
    habTexto: H.cn17,
    nivel: 'facil',
    enunciado: ['O rótulo de uma bebida isotônica informa que a concentração de sódio é de 450 mg por litro.'],
    comando: 'Quantos miligramas de sódio há em um copo de 200 mL dessa bebida?',
    alternativas: ['0,9 mg', '2,25 mg', '9 mg', '45 mg', '90 mg'],
    gabarito: 4,
    resolucao: [
      'Um copo de 200 mL corresponde a 0,2 L.',
      'Massa de sódio: \\(450\\ \\text{mg/L} \\cdot 0{,}2\\ \\text{L} = 90\\) mg.',
    ],
    distratores: {
      A: 'Converte 200 mL em 0,002 L.',
      B: 'Divide 450 por 200, sem converter mililitros em litros.',
      C: 'Converte 200 mL em 0,02 L.',
      D: 'Calcula para 100 mL, metade do copo.',
    },
    similaridade: 82,
    estado: 'pendente',
  },
];
