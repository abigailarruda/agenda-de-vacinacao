import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { Badge, Divider, List, ListItem, Text } from '@chakra-ui/react';

import { ESituationColors } from 'enums/situation';

import { Modal } from 'components/Modal';
import { Table } from 'components/Table';
import { Title } from 'components/Title';

import { VaccineResponse } from 'models/vaccine';
import { ScheduleVaccineResponse } from 'models/schedule';

import { api } from 'services/api';

import { formatDate } from 'utils/format_date';

export interface VaccineViewModalRef {
  handleOpenModal: (id: number) => void;
}

const VaccineViewModal = forwardRef<VaccineViewModalRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vaccine, setVaccine] = useState<VaccineResponse | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenModal: async (id: number) => {
      setOpen(true);
      setLoading(true);

      await api
        .get<VaccineResponse>(`/vacinas/obter/${id}`)
        .then(({ data }) => setVaccine(data))
        .finally(() => setLoading(false));
    },
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    setVaccine(null);
  };

  const columns: TableColumn<ScheduleVaccineResponse>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'ID do usuário', width: '8rem', selector: row => row.usuarioId },
      { name: 'Data', selector: row => formatDate(row.data) },
      {
        name: 'Situação',
        selector: row => row.situacaoDescricao,
        cell: (row) => (
          <Badge variant="subtle" colorScheme={ESituationColors[row.situacaoDescricao]}>
            {row.situacaoDescricao}
          </Badge>
        ),
      },
      { name: 'Observações', selector: row => row.observacoes ? row.observacoes : '-' },
      { name: 'Data da situação', selector: row => row.dataSituacao ? formatDate(row.dataSituacao) : '-' },
    ];
  }, []);

  if (!open) return <></>;

  return (
    <Modal open={open} handleClose={handleCloseModal} size="4xl" title={vaccine?.titulo}>

      <List spacing="0.25rem" marginBottom="1rem">
        <ListItem>
          <Title text="Título: "/> {vaccine?.titulo}
        </ListItem>

        <ListItem>
          <Title text="Descrição:" /> {vaccine?.descricao ? vaccine?.descricao : '-'}
        </ListItem>

        <ListItem>
          <Title text="Doses: "/> {vaccine?.doses}
        </ListItem>

        <ListItem>
          <Title text="Intervalo: "/> {vaccine?.intervalo}
        </ListItem>

        <ListItem>
          <Title text="Periodicidade: "/> {vaccine?.periodicidadeDescricao}
        </ListItem>
      </List>

      {!!vaccine?.agendas?.length && (
        <>
          <Divider marginBottom="1rem" />

          <Text color="green.500" textTransform="uppercase" fontSize="0.75rem" fontWeight="600" marginBottom="1rem">
            Agendas
          </Text>

          <Table
            data={vaccine?.agendas || []}
            columns={columns}
            loading={loading}
            paginationServer={false}
            meta={{ per: 5, total: vaccine?.agendas?.length }}
          />
        </>
      )}
    </Modal>
  );
});

export default VaccineViewModal;
