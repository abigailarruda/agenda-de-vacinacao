import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { Container, Divider, List, ListItem, SimpleGrid, Text } from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import { Table } from 'components/Table';
import { Title } from 'components/Title';

import { UserResponse } from 'models/user';

import { api } from 'services/api';

import { formatDate } from 'utils/format_date';

export interface UserViewModalRef {
  handleOpenModal: (id: number) => void;
}

const UserViewModal = forwardRef<UserViewModalRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenModal: async (id: number) => {
      setOpen(true);
      setLoading(true);

      await api
        .get<UserResponse>(`/usuarios/obter/${id}`)
        .then(({ data }) => setUser(data))
        .finally(() => setLoading(false));
    },
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    setUser(null);
  };

  const columns: TableColumn<{ nome: string, id: number }>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'Nome', selector: row => row.nome },
    ];
  }, []);

  if (!open) return <></>;

  return (
    <Modal open={open} handleClose={handleCloseModal} size="3xl" title={user?.nome}>

      <List spacing="0.25rem" marginBottom="1rem">
        <ListItem>
          <Title text="Sexo: "/> {user?.sexoDescricao}
        </ListItem>

        <ListItem>
          <Title text="Data de nascimento:" /> {formatDate(user?.dataNascimento)}
        </ListItem>

        <ListItem>
          <Title text="Logradouro: "/> {user?.endereco.logradouro}
        </ListItem>

        <ListItem>
          <Title text="Número: "/> {user?.endereco.numero}
        </ListItem>

        <ListItem>
          <Title text="Setor: "/> {user?.endereco.setor}
        </ListItem>

        <ListItem>
          <Title text="Cidade: "/> {user?.endereco.cidade}
        </ListItem>

        <ListItem>
          <Title text="UF: "/> {user?.endereco.unidadeFederativaDescricao}
        </ListItem>
      </List>

      {!!user?.agendas?.length && (
        <>
          <Divider marginBottom="1rem" />

          <Text color="green.500" textTransform="uppercase" fontSize="0.75rem" fontWeight="600" marginBottom="1rem">
            Agendas
          </Text>

          <Table
            data={user?.agendas}
            columns={columns}
            loading={loading}
            paginationServer={false}
            meta={{ per: 5, total: user?.agendas?.length }}
          />
        </>
      )}

      {!!user?.alergias?.length && (
        <>
          <Divider marginBottom="1rem" />

          <Text color="green.500" textTransform="uppercase" fontSize="0.75rem" fontWeight="600" marginBottom="1rem">
            Alergias
          </Text>

          <Table
            data={user?.alergias}
            columns={columns}
            loading={loading}
            paginationServer={false}
            meta={{ per: 5, total: user?.alergias?.length }}
          />
        </>
      )}
    </Modal>
  );
});

export default UserViewModal;
