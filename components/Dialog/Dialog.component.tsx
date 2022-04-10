import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from '@chakra-ui/react';

import { api } from 'services/api';

type ObjectType = 'alergias' | 'usuarios' | 'vacinas' | 'agendas';

export interface DialogRef {
  handleOpenDialog: (id: number, type: ObjectType) => void;
}

interface Props<T = unknown> {
  handleSuccess: () => Promise<T[]>;
}

const Dialog = forwardRef<DialogRef, Props>(({ handleSuccess }, ref) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const toast = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [type, setType] = useState<ObjectType | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenDialog: (id: number, type: ObjectType) => {
      setOpen(true);
      setId(id);
      setType(type);
    },
  }), []);

  const handleCloseDialog = () => {
    setOpen(false);
    setLoading(false);
    setId(null);
    setType(null);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete(`${type}/remover/${id}`);

      await handleSuccess();

      handleCloseDialog();
    } catch {
      toast({
        description: 'Por favor, tente novamente.',
        duration: 9000,
        isClosable: false,
        position: 'top-right',
        status: 'error',
        title: `Ocorreu um erro ao remover ${type === 'usuarios' ? 'usuário' : type.slice(0, -1)}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return <></>;

  return (
    <AlertDialog isCentered isOpen={open} leastDestructiveRef={cancelButtonRef} onClose={handleCloseDialog} size="sm">
      <AlertDialogOverlay backdropFilter="blur(2px)">
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold" textAlign="center">
            Excluir {type === 'usuarios' ? 'usuário' : type.slice(0, -1)}
          </AlertDialogHeader>

          <AlertDialogBody textAlign="center">
            Você tem certeza?<br/>
            Essa ação não poderá ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter justifyContent="center">
            <Button onClick={handleCloseDialog} ref={cancelButtonRef}>
              Cancelar
            </Button>

            <Button colorScheme="red" isLoading={loading} marginLeft="1rem" onClick={handleDelete}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
});

export default Dialog;
