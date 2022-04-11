import { Address } from './address';
import { AllergyUserResponse } from './allergy';
import { ScheduleUserResponse } from './schedule';

interface User {
  alergiasIds: number[];
  dataNascimento: string;
  endereco: Address;
  id?: number;
  nome: string;
  sexo: number;
  sexoDescricao?: string;
}

interface UserResponse extends Pick<User, 'dataNascimento' | 'endereco' | 'nome' | 'sexo'> {
  id: number;
  sexoDescricao: string;
  agendas: ScheduleUserResponse[],
  alergias: AllergyUserResponse[];
}
