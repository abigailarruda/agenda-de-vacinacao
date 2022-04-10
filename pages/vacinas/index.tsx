import Head from 'next/head';
import type { NextPage } from 'next';
import { Container, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { Table } from 'components/Table';

import { Main } from 'layouts/Main';

const Vaccines: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Vacinas</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" /* onClick={() => modalRef.current?.handleOpenModal()} */>
            Adicionar vacina
          </Button>
        </Container>

        <Table
          data={[]}
          columns={[]}
          // loading={isValidating}
          paginationServer={false}
          meta={{ per: 10, total: 0 }}
        />
      </Main>
    </>
  );
};

export default Vaccines;
