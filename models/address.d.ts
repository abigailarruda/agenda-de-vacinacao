export interface Address {
  logradouro: string;
  numero: number;
  setor: string;
  cidade: string;
  unidadeFederativa: number;            // This field goes in the request
  unidadeFederativaDescricao?: string;  // This field comes in the response
}
