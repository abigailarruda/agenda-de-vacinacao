import Head from 'next/head';
import type { NextPage } from 'next';
import { FiPlus } from 'react-icons/fi';
import { TableColumn } from 'react-data-table-component';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';
import {
  Container, Button, Badge, Collapse, useDisclosure, Radio, RadioGroup, Stack, VStack, Box, SimpleGrid, Divider, Center,
} from '@chakra-ui/react';

import { ESituationColors } from 'enums/situation';

import { Actions } from 'components/Actions';
import { Dialog, DialogRef } from 'components/Dialog';
import { ScheduleFormModal, ScheduleFormModalRef } from 'components/pages/agendas/ScheduleFormModal';
import { ScheduleViewModal, ScheduleViewModalRef } from 'components/pages/agendas/ScheduleViewModal';
import { ScheduleWriteOffModal, ScheduleWriteOffModalRef } from 'components/pages/agendas/ScheduleWriteOffModal';
import { Table } from 'components/Table';
import { CommonSelect } from 'components/CommonSelect';
import { situationSelect } from 'components/pages/agendas/ScheduleWriteOffModal/ScheduleWriteOffModal.utils';

import { useFetch } from 'hooks/useFetch.hook';

import { Main } from 'layouts/Main';

import { ScheduleResponse } from 'models/schedule';
import { UserResponse } from 'models/user';

import { api } from 'services/api';

import { formatDate } from 'utils/format_date';

const Schedule: NextPage = () => {
  const modalRef = useRef<ScheduleFormModalRef>(null);
  const viewModalRef = useRef<ScheduleViewModalRef>(null);
  const writeOffModalRef = useRef<ScheduleWriteOffModalRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const { data: schedules, isValidating, mutate: updateSchedulesTable } = useFetch<ScheduleResponse[]>(
    '/agendas/listar'
  );

  const [filter, setFilter] = useState<number | null>(null);
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleResponse[] | null>(schedules);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(isValidating);

  const { isOpen, onToggle } = useDisclosure();

  const { data: users } = useFetch<UserResponse[]>('/usuarios/listar');

  const usersOptions = users?.map(user => ({ label: user.nome, value: user.id }));

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
          handleWriteOff={() => writeOffModalRef.current?.handleOpenModal(row.id)}
          key={row.id}
        />,
      },
    ];
  }, []);

  const handleFilters = async () => {
    setLoading(true);

    if (filter) {
      try {
        switch (filter) {
          case 1:
            await api
              .get<ScheduleResponse[]>(`/agendas/listarPorSituacao/${selectedValue}`)
              .then(({ data }) => setFilteredSchedules(data));
            break;
          case 2:
            const date = new Date().toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).split('/').join('%2F');

            await api
              .get<ScheduleResponse[]>(`/agendas/listarPorData/${date}`)
              .then(({ data }) => setFilteredSchedules(data));
            break;
          case 3:
            await api
              .get<ScheduleResponse[]>(`/agendas/listarPorUsuario/${selectedValue}`)
              .then(({ data }) => setFilteredSchedules(data));
            break;
          default:
            break;
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (schedules) {
      setFilteredSchedules(schedules);
      setLoading(isValidating);
    }
  }, [isValidating, schedules]);

  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Agendas</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button
            leftIcon={<BiFilterAlt />}
            variant="outline"
            onClick={onToggle}
            borderColor="gray.200"
            marginRight="1rem"
          >
            Filtros
          </Button>

          <Button leftIcon={<FiPlus />} colorScheme="green" onClick={() => modalRef.current?.handleOpenModal()}>
            Adicionar agenda
          </Button>
        </Container>

        <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
          <Container
            border="1px"
            borderStyle="solid"
            borderColor="gray.200"
            borderRadius="4px"
            minWidth="100%"
            width="100%"
            padding="1rem"
          >
            <SimpleGrid columns={2} width="100%" marginBottom="1rem">
              <RadioGroup
                colorScheme="green"
                name="filtros"
                value={`${filter}`}
                onChange={(value) => setFilter(Number(value))}
              >
                <VStack align="flex-start">
                  <Radio value="1">Filtrar por situação</Radio>
                  <Radio value="2">Filtrar pela data atual</Radio>
                  <Radio value="3">Filtrar por usuário</Radio>
                </VStack>
              </RadioGroup>

              <Box
                borderLeft="1px"
                borderLeftColor="gray.200"
                borderLeftStyle="solid"
                paddingLeft="1rem"
                minWidth="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <CommonSelect
                  name="usuarioId"
                  placeholder="Usuário"
                  options={usersOptions}
                  disabled={filter !== 3}
                  onChange={(option) => setSelectedValue(Number(option?.value))}
                />

                <CommonSelect
                  name="situacao"
                  placeholder="Situação"
                  options={situationSelect}
                  disabled={filter !== 1}
                  onChange={(option) => setSelectedValue(Number(option?.value))}
                />
              </Box>
            </SimpleGrid>

            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Button onClick={async () => {
                setFilter(null);
                setFilteredSchedules(schedules);
                setSelectedValue(null);
                onToggle();
              }}>
                Limpar
              </Button>

              <Button colorScheme="green" marginLeft="1rem" onClick={handleFilters}>
                Filtrar
              </Button>
            </Box>
          </Container>
        </Collapse>

        <Table
          data={filteredSchedules || []}
          columns={columns}
          loading={loading}
          paginationServer={false}
          meta={{ per: 10, total: schedules?.length }}
        />
      </Main>

      <ScheduleFormModal ref={modalRef} handleSuccess={updateSchedulesTable} />

      <ScheduleViewModal ref={viewModalRef} />

      <ScheduleWriteOffModal ref={writeOffModalRef} handleSuccess={updateSchedulesTable} />

      <Dialog ref={dialogRef} handleSuccess={updateSchedulesTable} />
    </>
  );
};

export default Schedule;
