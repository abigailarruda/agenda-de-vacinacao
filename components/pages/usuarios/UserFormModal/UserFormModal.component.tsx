import { Alert, Button, ButtonGroup, Container, ListItem, SimpleGrid, UnorderedList, Text } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Modal } from 'components/Modal';
import { Input } from 'components/Input';
import { Select } from 'components/Select';

import { useFetch } from 'hooks/useFetch.hook';

import { Allergy } from 'models/allergy';
import { User, UserResponse } from 'models/user';

import { api } from 'services/api';

import { formatDateToRequest } from 'utils/format_date';

import { sexSelect, stateSelect } from './UserFormModal.utils';
import { schema } from './UserFormModal.validations';

export interface UserFormModalRef {
  handleOpenModal: () => void;
}

interface Props {
  handleSuccess: () => Promise<UserResponse[]>;
}

const UserFormModal = forwardRef<UserFormModalRef, Props>(({ handleSuccess }, ref) => {
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allergiesIds, setAllergiesIds] = useState<Allergy[]>([]);

  const { data: allergies } = useFetch<Allergy[]>('alergias/listar');

  useImperativeHandle(ref, () => ({
    handleOpenModal: () => setOpen(true),
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    setAllergiesIds([]);
  };

  const handleSelectAllergies = (allergyId: string | number) => {
    setAllergiesIds((prev) => [...prev, allergies?.find(allergy => allergy.id === allergyId)]);
  };

  const allergiesOptions = allergies
    ?.filter(item => !allergiesIds.includes(item))
    ?.map((allergy) => ({ label: allergy.nome, value: allergy.id }));

  const handleSubmit: SubmitHandler<User> = async data => {
    setLoading(true);

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post<User>('/usuarios/criar', {
        nome: data.nome,
        dataNascimento: formatDateToRequest(data.dataNascimento),
        sexo: Number(data.sexo),
        alergiasIds: allergiesIds?.map(allergy => allergy.id),
        endereco: {
          logradouro: data.endereco.logradouro,
          numero: Number(data.endereco.numero),
          setor: data.endereco.setor,
          cidade: data.endereco.cidade,
          unidadeFederativa: Number(data.endereco.unidadeFederativa),
        },
      });

      await handleSuccess();

      handleCloseModal();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: { [key: string]: string } = {};

        error.inner.forEach(error => {
          if (error.path) errors[error.path] = error.message;
        });

        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return <></>;

  return (
    <Modal open={open} handleClose={handleCloseModal} size="2xl" title="Adicionar usuário">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SimpleGrid columns={2} spacing="1rem">
          <Input name="nome" placeholder="Nome" />

          <Select
            name="alergiasIds"
            placeholder="Alergias"
            onChange={(option) => handleSelectAllergies(option?.value)}
            options={allergiesOptions}
          />

          <Input name="dataNascimento" placeholder="Data de nascimento" mask="99/99/9999"/>

          <Select name="sexo" placeholder="Sexo" options={sexSelect} />

          <Select name="endereco.unidadeFederativa" placeholder="UF" options={stateSelect} />

          <Input name="endereco.cidade" placeholder="Cidade" />

          <Input name="endereco.setor" placeholder="Setor" />

          <Input name="endereco.logradouro" placeholder="Logradouro" />

          <Input name="endereco.numero" placeholder="Número" type="number" />
        </SimpleGrid>

        {!!allergiesIds.length && (
          <Container minWidth="100%" marginTop="1rem" padding={0}>
            <Alert status="info" borderRadius="4px" flexDirection="column" alignItems="flex-start">
              <Text fontWeight="600" color="blue.700" marginBottom="0.5rem">Alergias</Text>

              <UnorderedList color="blue.700">
                {allergiesIds?.map((allergy) => (<ListItem key={allergy.id}>{allergy.nome}</ListItem>))}
              </UnorderedList>
            </Alert>
          </Container>
        )}

        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0} marginTop="1rem">
          <ButtonGroup spacing="1rem">
            <Button onClick={handleCloseModal}>
              Cancelar
            </Button>

            <Button type="submit" colorScheme="green" isLoading={loading}>
              Salvar
            </Button>
          </ButtonGroup>
        </Container>
      </Form>
    </Modal>
  );
});

export default UserFormModal;
