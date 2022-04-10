import { Button, Container } from '@chakra-ui/react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Modal } from 'components/Modal';
import { Input } from 'components/Input';

import { Allergy } from 'models/allergy';

import { api } from 'services/api';

import { schema } from './AllergyFormModal.validations';

export interface AllergyFormModalRef {
  handleOpenModal: () => void;
}

interface Props {
  handleSuccess: () => Promise<Allergy[]>;
}

const AllergyFormModal = forwardRef<AllergyFormModalRef, Props>(({ handleSuccess }, ref) => {
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

  const handleSubmit: SubmitHandler<Allergy> = async data => {
    setLoading(true);

    try {
      await schema.validate(data, { abortEarly: false });

      await api.post<Allergy>('/alergias/criar', { nome: data.nome });

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
    <Modal open={open} handleClose={handleCloseModal} size="sm" title="Adicionar alergia">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="nome" placeholder="Nome" />

        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0} marginTop="1rem">
          <Button onClick={handleCloseModal}>
            Cancelar
          </Button>

          <Button type="submit" colorScheme="green" isLoading={loading} marginLeft="1rem">
            Salvar
          </Button>
        </Container>
      </Form>
    </Modal>
  );
});

export default AllergyFormModal;
