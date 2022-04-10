export interface Allergy {
  id?: number;
  nome: string;
  usuariosIds?: number[];   // This field goes in the request
  usuarios?: {              // This field comes in the response
    nome: string;
    id: number;
  }[];
}
