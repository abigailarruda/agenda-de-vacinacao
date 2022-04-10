export interface Address {
  cidade: string;
  logradouro: string;
  numero: number;
  setor: string;
  unidadeFederativa: number;            // This field goes in the request
  unidadeFederativaDescricao?: string;  // This field comes in the response
}
