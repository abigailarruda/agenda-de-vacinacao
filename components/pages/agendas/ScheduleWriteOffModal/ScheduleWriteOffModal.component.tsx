import { Button, ButtonGroup, Container } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Modal } from 'components/Modal';
import { Select } from 'components/Select';

import { Schedule, ScheduleResponse, ScheduleWriteOff } from 'models/schedule';

import { api } from 'services/api';

import { schema } from './ScheduleWriteOffModal.validations';
import { situationSelect } from './ScheduleWriteOffModal.utils';

export interface ScheduleWriteOffModalRef {
  handleOpenModal: (id: number) => void;
}

interface Props {
  handleSuccess: () => Promise<ScheduleResponse[]>;
}

const ScheduleWriteOffModal = forwardRef<ScheduleWriteOffModalRef, Props>(({ handleSuccess }, ref) => {
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleId, setScheduleId] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenModal: (id: number) => {
      setOpen(true);
      setScheduleId(id);
    },
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    setScheduleId(null);
  };

  const handleSubmit: SubmitHandler<ScheduleWriteOff> = async data => {
    setLoading(true);

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post<Schedule>(`/agendas/darBaixa/${data.situacao}/${scheduleId}`);

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
    <Modal open={open} handleClose={handleCloseModal} size="sm" title={`Dar baixa na agenda (ID: ${scheduleId})`}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select name="situacao" placeholder="Situação" options={situationSelect} />

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

export default ScheduleWriteOffModal;
