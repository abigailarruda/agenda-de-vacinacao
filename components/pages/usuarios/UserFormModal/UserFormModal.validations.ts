import * as yup from 'yup';

export const schema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome é obrigatório'),

  dataNascimento: yup
    .string()
    .required('Data de nascimento é obrigatório')
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      {
        excludeEmptyString: true,
        message: 'Data de nascimento inválida',
      }
    ),

  sexo: yup
    .number()
    .required('Sexo é obrigatório'),

  endereco: yup.object().shape({
    logradouro: yup
      .string()
      .required('Logradouro é obrigatório'),

    numero: yup
      .string()
      .required('Número é obrigatório'),

    setor: yup
      .string()
      .required('Setor é obrigatório'),

    cidade: yup
      .string()
      .required('Cidade é obrigatório'),

    unidadeFederativa: yup
      .number()
      .required('UF é obrigatório'),
  }),

  alergiasId: yup.array().of(
    yup.object().shape({
      id: yup.number(),
    })
  ),
});
