import * as yup from 'yup';

export const schema = yup.object().shape({
  titulo: yup
    .string()
    .required('Título é obrigatório'),

  descricao: yup.string(),

  doses: yup
    .string()
    .required('Doses é obrigatório'),

  intervalo: yup
    .string()
    .required('Intervalo é obrigatório'),

  periodicidade: yup
    .number()
    .required('Periodicidade é obrigatório'),
});
