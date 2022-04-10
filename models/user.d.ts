import { Address } from './address';

interface User {
  id?: number;
  nome: string;
  dataNascimento: string;
  sexo: number;
  endereco: Address;
  alergiasIds: number[];
}

interface UserResponse {
    id: number;
    nome: string;
    sexoDescricao: string;
    dataNascimento: string;
    sexo: number;
    endereco: Address;
    agendas: [
      {
        id: number;
        situacaoDescricao: string;
        data: string;
        situacao: number;
        dataSituacao: string;
        observacoes: string;
      }
    ],
    alergias: [
      {
        id: number;
        nome: string;
      }
    ]
}
