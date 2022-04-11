import { User } from './user';
import { Vaccine } from './vaccine';

export interface Schedule {
  data: string;
  observacoes: string;
  usuarioId: number;
  vacinaId: number;
}

export interface ScheduleResponse extends Pick<Schedule, 'data' | 'observacoes'> {
  dataSituacao: string;
  id: number;
  situacao: number;
  situacaoDescricao: string;
  usuario: User;
  vacina: Vaccine;
}

export type ScheduleUserResponse = Pick<ScheduleResponse,
  'data' | 'dataSituacao' | 'id' | 'observacoes' | 'situacao' | 'situacaoDescricao'>;

export interface ScheduleVaccineResponse extends ScheduleUserResponse {
  usuarioId: number;
};

export interface ScheduleWriteOff extends Pick<ScheduleResponse, 'situacao'> {
  agendaId: string;
}
