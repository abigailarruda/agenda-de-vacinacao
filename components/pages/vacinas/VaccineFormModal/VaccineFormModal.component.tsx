import { Button, ButtonGroup, Container, SimpleGrid } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Modal } from 'components/Modal';
import { Input } from 'components/Input';
import { Select } from 'components/Select';

import { Vaccine, VaccineResponse } from 'models/vaccine';

import { api } from 'services/api';

import { periodSelect } from './VaccineFormModal.utils';
import { schema } from './VaccineFormModal.validations';

export interface VaccineFormModalRef {
  handleOpenModal: () => void;
}

interface Props {
  handleSuccess: () => Promise<VaccineResponse[]>;
}

const VaccineFormModal = forwardRef<VaccineFormModalRef, Props>(({ handleSuccess }, ref) => {
  const formRef = useRef<FormHandles>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpenModal: () => setOpen(true),
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleSubmit: SubmitHandler<Vaccine> = async data => {
    setLoading(true);

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post<Vaccine>('/vacinas/criar', {
        titulo: data.titulo,
        descricao: data.descricao,
        intervalo: Number(data.intervalo),
        doses: Number(data.doses),
        periodicidade: Number(data.periodicidade),
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
    <Modal open={open} handleClose={handleCloseModal} size="2xl" title="Adicionar vacina">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SimpleGrid columns={2} spacing="1rem">
          <Input name="titulo" placeholder="Título" />

          <Select name="periodicidade" placeholder="Periodicidade" options={periodSelect} />

          <Input name="descricao" placeholder="Descrição" />

          <Input name="doses" placeholder="Doses" type="number" />

          <Input name="intervalo" placeholder="Intervalo" type="number" />
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

export default VaccineFormModal;
