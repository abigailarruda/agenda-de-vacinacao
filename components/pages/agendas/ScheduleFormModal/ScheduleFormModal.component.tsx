import { Button, ButtonGroup, Container, SimpleGrid } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Select } from 'components/Select';

import { useFetch } from 'hooks/useFetch.hook';

import { Schedule, ScheduleResponse } from 'models/schedule';

import { api } from 'services/api';

import { formatDateToRequest } from 'utils/format_date';

import { periodSelect } from './ScheduleFormModal.utils';
import { schema } from './ScheduleFormModal.validations';
import { UserResponse } from 'models/user';
import { VaccineResponse } from 'models/vaccine';

export interface ScheduleFormModalRef {
  handleOpenModal: () => void;
}

interface Props {
  handleSuccess: () => Promise<ScheduleResponse[]>;
}

const ScheduleFormModal = forwardRef<ScheduleFormModalRef, Props>(({ handleSuccess }, ref) => {
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: users } = useFetch<UserResponse[]>('/usuarios/listar');
  const { data: vaccines } = useFetch<VaccineResponse[]>('/vacinas/listar');

  useImperativeHandle(ref, () => ({
    handleOpenModal: () => setOpen(true),
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
  };

  const usersOptions = users?.map(user => ({ label: user.nome, value: user.id }));
  const vaccinesOptions = vaccines?.map(vaccine => ({ label: vaccine.titulo, value: vaccine.id }));

  const handleSubmit: SubmitHandler<Schedule> = async data => {
    setLoading(true);

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post<Schedule>('/agendas/criar', {
        data: formatDateToRequest(data.data),
        observacoes: data.observacoes,
        usuarioId: data.usuarioId,
        vacinaId: data.vacinaId,
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
    <Modal open={open} handleClose={handleCloseModal} size="2xl" title="Adicionar agenda">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SimpleGrid columns={2} spacing="1rem">
          <Select name="usuarioId" placeholder="Usuário" options={usersOptions} />

          <Select name="vacinaId" placeholder="Vacina" options={vaccinesOptions} />

          <Input name="data" placeholder="Data" mask="99/99/9999"/>

          <Input name="observacoes" placeholder="Observações" />
        </SimpleGrid>

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

export default ScheduleFormModal;
