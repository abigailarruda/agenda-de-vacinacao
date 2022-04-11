import { ScheduleVaccineResponse } from './schedule';

export interface Vaccine {
  descricao: string;
  doses: number;
  id?: number;
  intervalo: number;
  periodicidade: number;            // This field goes in the request
  periodicidadeDescricao?: string;  // This field comes in the response
  titulo: string;
}

export interface VaccineResponse extends Vaccine {
  agendas: ScheduleVaccineResponse[];
}
