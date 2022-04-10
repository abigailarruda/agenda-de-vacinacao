import * as yup from 'yup';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório'),
});
