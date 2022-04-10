import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { Text } from '@chakra-ui/react';

import { Modal } from 'components/Modal';
import { Table } from 'components/Table';

import { Allergy } from 'models/allergy';

import { api } from 'services/api';

export interface AllergyViewModalRef {
  handleOpenModal: (id: number) => void;
}

const AllergyViewModal = forwardRef<AllergyViewModalRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allergy, setAllergy] = useState<Allergy | null>(null);

  useImperativeHandle(ref, () => ({
    handleOpenModal: async (id: number) => {
      setOpen(true);
      setLoading(true);

      await api
        .get<Allergy>(`/alergias/obter/${id}`)
        .then(({ data }) => setAllergy(data))
        .finally(() => setLoading(false));
    },
  }), []);

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    setAllergy(null);
  };

  const columns: TableColumn<{ nome: string, id: number }>[] = useMemo(() => {
    return [
      { name: 'ID', width: '5rem', selector: row => row.id },
      { name: 'Nome', selector: row => row.nome },
    ];
  }, []);

  if (!open) return <></>;

  return (
    <Modal open={open} handleClose={handleCloseModal} size="3xl" title={allergy?.nome}>
      {!!allergy?.usuarios?.length && (
        <Text color="green.500" textTransform="uppercase" fontSize="0.75rem" fontWeight="600" marginBottom="1rem">
          Usuários com esta alergia
        </Text>
      )}

      <Table
        data={allergy?.usuarios}
        columns={columns}
        loading={loading}
        paginationServer={false}
        meta={{ per: 5, total: allergy?.usuarios?.length }}
      />
    </Modal>
  );
});

export default AllergyViewModal;
