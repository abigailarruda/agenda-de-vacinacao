import DataTable, { TableColumn, TableProps } from 'react-data-table-component';
import { Box } from '@chakra-ui/react';

import { Loader } from 'components/Loader';

import { customStyles } from './Table.utils';

interface Props<T = unknown> extends TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  meta: {
    per: number;
    total: number;
  }
}

const Table = ({ data, columns, meta, loading }: Props) => {
  return (
    <Box
      borderColor="gray.200"
      borderStyle="solid"
      borderWidth="1px"
      borderRadius="4px"
      padding={!!data?.length ? '0 1rem' : '1rem'}
      width="100%"
    >
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={data}
        noDataComponent="Não há dados suficientes."
        noHeader
        pagination
        paginationComponentOptions={{ noRowsPerPage: true, rangeSeparatorText: 'de' }}
        paginationPerPage={meta.per}
        paginationServer={false}
        paginationTotalRows={meta.total}
        progressComponent={<Loader />}
        progressPending={loading}
      />
    </Box>
  );
};

export default Table;
