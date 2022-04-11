import Head from 'next/head';
import type { NextPage } from 'next';
import { Container, Button, Badge } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { TableColumn } from 'react-data-table-component';
import { useMemo, useRef } from 'react';

import { ESituationColors } from 'enums/situation';

import { Actions } from 'components/Actions';
import { Dialog, DialogRef } from 'components/Dialog';
import { ScheduleFormModal, ScheduleFormModalRef } from 'components/pages/agendas/ScheduleFormModal';
import { ScheduleViewModal, ScheduleViewModalRef } from 'components/pages/agendas/ScheduleViewModal';
import { Table } from 'components/Table';

import { useFetch } from 'hooks/useFetch.hook';

import { Main } from 'layouts/Main';

import { ScheduleResponse } from 'models/schedule';

import { formatDate } from 'utils/format_date';

const Schedule: NextPage = () => {
  const modalRef = useRef<ScheduleFormModalRef>(null);
  const viewModalRef = useRef<ScheduleViewModalRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const { data: schedules, isValidating, mutate: updateSchedulesTable } = useFetch<ScheduleResponse[]>(
    '/agendas/listar'
  );

  const columns: TableColumn<ScheduleResponse>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'ID do usuário', width: '8rem', selector: row => row.usuario.id },
      { name: 'Data', selector: row => formatDate(row.data) },
      { name: 'Vacina', selector: row => row.vacina.titulo },
      {
        name: 'Situação',
        selector: row => row.situacaoDescricao,
        cell: (row) => (
          <Badge variant="subtle" colorScheme={ESituationColors[row.situacaoDescricao]}>
            {row.situacaoDescricao}
          </Badge>
        ),
      },
      { name: 'Data da situação', selector: row => row.dataSituacao ? formatDate(row.dataSituacao) : '-' },
      {
        name: '',
        width: '7.5rem',
        cell: (row) => <Actions
          showWriteOff
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
        <title>Agenda de Vacinação | Agendas</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" onClick={() => modalRef.current?.handleOpenModal()}>
            Adicionar agenda
          </Button>
        </Container>

        <Table
          data={schedules || []}
          columns={columns}
          loading={isValidating}
          paginationServer={false}
          meta={{ per: 10, total: schedules?.length }}
        />
      </Main>

      <ScheduleFormModal ref={modalRef} handleSuccess={updateSchedulesTable} />

      <ScheduleViewModal ref={viewModalRef} />

      <Dialog ref={dialogRef} handleSuccess={updateSchedulesTable} />
    </>
  );
};

export default Schedule;
