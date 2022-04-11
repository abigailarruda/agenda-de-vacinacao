import * as yup from 'yup';

export const schema = yup.object().shape({
  situacao: yup
    .number()
    .required('Situação é obrigatório'),
});
