import { forwardRef, useImperativeHandle, useState } from 'react';
import { Badge, List, ListItem } from '@chakra-ui/react';

import { ESituationColors } from 'enums/situation';

import { Modal } from 'components/Modal';
import { Title } from 'components/Title';

import { ScheduleResponse } from 'models/schedule';

import { api } from 'services/api';

import { formatDate } from 'utils/format_date';

export interface ScheduleViewModalRef {
  handleOpenModal: (id: number) => void;
}

const ScheduleViewModal = forwardRef<ScheduleViewModalRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenModal: async (id: number) => {
      setOpen(true);

      await api
        .get<ScheduleResponse>(`/agendas/obter/${id}`)
        .then(({ data }) => setSchedule(data));
    },
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setSchedule(null);
  };

  if (!open) return <></>;

  return (
    <Modal open={open} handleClose={handleCloseModal} size="3xl" title={`Agenda (ID: ${schedule?.id})`}>

      <List spacing="0.25rem" marginBottom="1rem">
        <ListItem>
          <Title text="Data: "/> {formatDate(schedule?.data)}
        </ListItem>

        <ListItem>
          <Title text="Situação: "/>

          <Badge variant="subtle" colorScheme={ESituationColors[schedule?.situacaoDescricao]}>
            {schedule?.situacaoDescricao}
          </Badge>
        </ListItem>

        <ListItem>
          <Title text="Data da situação: "/> {schedule?.dataSituacao ? formatDate(schedule?.dataSituacao) :  '-'}
        </ListItem>

        <ListItem>
          <Title text="Observações: "/> {schedule?.observacoes ? schedule?.observacoes : '-'}
        </ListItem>

        <ListItem>
          <Title text="Usuário: "/> {schedule?.usuario.nome} (ID: {schedule?.usuario.id})
        </ListItem>

        <ListItem>
          <Title text="Sexo: "/> {schedule?.usuario.sexoDescricao}
        </ListItem>

        <ListItem>
          <Title text="Data de nascimento:" /> {formatDate(schedule?.usuario.dataNascimento)}
        </ListItem>

        <ListItem>
          <Title text="Logradouro: "/> {schedule?.usuario.endereco.logradouro}
        </ListItem>

        <ListItem>
          <Title text="Número: "/> {schedule?.usuario.endereco.numero}
        </ListItem>

        <ListItem>
          <Title text="Setor: "/> {schedule?.usuario.endereco.setor}
        </ListItem>

        <ListItem>
          <Title text="Cidade: "/> {schedule?.usuario.endereco.cidade}
        </ListItem>

        <ListItem>
          <Title text="UF: "/> {schedule?.usuario.endereco.unidadeFederativaDescricao}
        </ListItem>

        <ListItem>
          <Title text="Vacina: "/> {schedule?.vacina.titulo}
        </ListItem>

        <ListItem>
          <Title text="Descrição:" /> {schedule?.vacina.descricao ? schedule?.vacina.descricao : '-'}
        </ListItem>

        <ListItem>
          <Title text="Doses: "/> {schedule?.vacina.doses}
        </ListItem>

        <ListItem>
          <Title text="Intervalo: "/> {schedule?.vacina.intervalo}
        </ListItem>

        <ListItem>
          <Title text="Periodicidade: "/> {schedule?.vacina.periodicidadeDescricao}
        </ListItem>
      </List>
    </Modal>
  );
});

export default ScheduleViewModal;
