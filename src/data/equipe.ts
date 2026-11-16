// Quem está por trás do projeto. Enquanto a lista estiver vazia, a seção "Quem está por trás" não aparece.
// Exemplo: { nome: 'Fulano de Tal', papel: 'Professor de Matemática', texto: 'Uma frase sobre a trajetória.' }
export interface Pessoa { nome: string; papel: string; texto: string }
export const equipe: Pessoa[] = [];
