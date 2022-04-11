import Head from 'next/head';
import type { NextPage } from 'next';
import { Container, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { TableColumn } from 'react-data-table-component';
import { useMemo, useRef } from 'react';

import { Actions } from 'components/Actions';
import { Dialog, DialogRef } from 'components/Dialog';
import { Table } from 'components/Table';
import { VaccineFormModal, VaccineFormModalRef } from 'components/pages/vacinas/VaccineFormModal';
import { VaccineViewModal, VaccineViewModalRef } from 'components/pages/vacinas/VaccineViewModal';

import { useFetch } from 'hooks/useFetch.hook';

import { Main } from 'layouts/Main';

import { VaccineResponse } from 'models/vaccine';

const Vaccines: NextPage = () => {
  const modalRef = useRef<VaccineFormModalRef>(null);
  const viewModalRef = useRef<VaccineViewModalRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const { data: vaccines, isValidating, mutate: updateVaccinesTable } = useFetch<VaccineResponse[]>('/vacinas/listar');

  const columns: TableColumn<VaccineResponse>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'Título', selector: row => row.titulo },
      {
        name: '',
        width: '6rem',
        cell: (row) => <Actions
          handleDelete={() => dialogRef.current?.handleOpenDialog(row.id, 'vacinas')}
          handleView={() => viewModalRef.current?.handleOpenModal(row.id)}
          key={row.id}
        />,
      },
    ];
  }, []);

  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Vacinas</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" onClick={() => modalRef.current?.handleOpenModal()}>
            Adicionar vacina
          </Button>
        </Container>

        <Table
          data={vaccines || []}
          columns={columns}
          loading={isValidating}
          paginationServer={false}
          meta={{ per: 10, total: vaccines?.length }}
        />
      </Main>

      <VaccineFormModal ref={modalRef} handleSuccess={updateVaccinesTable} />

      <VaccineViewModal ref={viewModalRef} />

      <Dialog ref={dialogRef} handleSuccess={updateVaccinesTable} />
    </>
  );
};

export default Vaccines;
