import Head from 'next/head';
import type { NextPage } from 'next';
import { Button, Container } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { TableColumn } from 'react-data-table-component';
import { useMemo, useRef } from 'react';

import { Actions } from 'components/Actions';
import { Dialog, DialogRef } from 'components/Dialog';
import { Table } from 'components/Table';
import { UserFormModal, UserFormModalRef } from 'components/pages/usuarios/UserFormModal';
import { UserViewModal, UserViewModalRef } from 'components/pages/usuarios/UserViewModal';

import { useFetch } from 'hooks/useFetch.hook';

import { Main } from 'layouts/Main';

import { UserResponse } from 'models/user';

import { formatDate } from 'utils/format_date';

const Users: NextPage = () => {
  const modalRef = useRef<UserFormModalRef>(null);
  const viewModalRef = useRef<UserViewModalRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const { data: users, isValidating, mutate: updateUsersTable } = useFetch<UserResponse[]>('/usuarios/listar');

  const columns: TableColumn<UserResponse>[] = useMemo(() => {
    return [
      {
        name: 'ID',
        width: '5rem',
        selector: row => row.id,
      },
      {
        name: 'Nome',
        width: '15rem',
        selector: row => row.nome,
      },
      {
        name: 'Data de nascimento',
        selector: row => formatDate(row.dataNascimento),
      },
      {
        name: 'Sexo',
        selector: row => row.sexoDescricao,
      },
      {
        name: '',
        width: '6rem',
        cell: (row) => <Actions
          handleDelete={() => dialogRef.current?.handleOpenDialog(row.id, 'usuarios')}
          handleView={() => viewModalRef.current?.handleOpenModal(row.id)}
          key={row.id}
        />,
      },
    ];
  }, []);

  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Usuários</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" onClick={() => modalRef.current?.handleOpenModal()}>
            Adicionar usuário
          </Button>
        </Container>

        <Table
          data={users}
          columns={columns}
          loading={isValidating}
          paginationServer={false}
          meta={{ per: 10, total: users?.length }}
        />
      </Main>

      <UserFormModal ref={modalRef} handleSuccess={updateUsersTable} />

      <UserViewModal ref={viewModalRef} />

      <Dialog ref={dialogRef} handleSuccess={updateUsersTable} />
    </>
  );
};

export default Users;
