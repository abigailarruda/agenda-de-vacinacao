import { Address } from './address';

interface User {
  id?: number;
  nome: string;
  dataNascimento: string;
  sexo: number;
  endereco: Address;
  alergiasIds: number[];
}
