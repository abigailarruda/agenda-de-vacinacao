import * as yup from 'yup';

export const schema = yup.object().shape({
  usuarioId: yup
    .number()
    .required('Usuário é obrigatório'),

  vacinaId: yup
    .number()
    .required('Usuário é obrigatório'),

  data: yup
    .string()
    .required('Data é obrigatório')
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      {
        excludeEmptyString: true,
        message: 'Data inválida',
      }
    ),

  observacoes: yup.string(),
});
