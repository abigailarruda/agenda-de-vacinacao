import Head from 'next/head';
import type { NextPage } from 'next';
import { Button, Container } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { TableColumn } from 'react-data-table-component';
import { useMemo, useRef } from 'react';

import { Actions } from 'components/Actions';
import { AllergyFormModal, AllergyFormModalRef } from 'components/pages/alergias/AllergyFormModal';
import { AllergyViewModal, AllergyViewModalRef } from 'components/pages/alergias/AllergyViewModal';
import { Dialog, DialogRef } from 'components/Dialog';
import { Table } from 'components/Table';

import { useFetch } from 'hooks/useFetch.hook';

import { Main } from 'layouts/Main';

import { Allergy } from 'models/allergy';

const Allergies: NextPage = () => {
  const modalRef = useRef<AllergyFormModalRef>(null);
  const viewModalRef = useRef<AllergyViewModalRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const { data: allergies, isValidating, mutate: updateAllergiesTable } = useFetch<Allergy[]>('/alergias/listar');

  const columns: TableColumn<Allergy>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'Nome', selector: row => row.nome },
      {
        name: '',
        width: '5rem',
        cell: (row) => (
          <Actions
            handleDelete={() => dialogRef.current?.handleOpenDialog(row.id, 'alergias')}
            handleView={() => viewModalRef.current?.handleOpenModal(row.id)}
            key={row.id}
          />
        ),
      },
    ];
  }, []);

  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Alergias</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" onClick={() => modalRef.current?.handleOpenModal()}>
            Adicionar alergia
          </Button>
        </Container>

        <Table
          data={allergies || []}
          columns={columns}
          loading={isValidating}
          paginationServer={false}
          meta={{ per: 10, total: allergies?.length }}
        />
      </Main>

      <AllergyFormModal ref={modalRef} handleSuccess={updateAllergiesTable} />

      <AllergyViewModal ref={viewModalRef} />

      <Dialog ref={dialogRef} handleSuccess={updateAllergiesTable} />
    </>
  );
};

export default Allergies;
