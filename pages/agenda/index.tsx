import Head from 'next/head';
import type { NextPage } from 'next';
import { FiPlus } from 'react-icons/fi';
import { Container, Button } from '@chakra-ui/react';

import { Table } from 'components/Table';

import { Main } from 'layouts/Main';

const Schedule: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agenda de Vacinação</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button leftIcon={<FiPlus />} colorScheme="green" /* onClick={() => modalRef.current?.handleOpenModal()}*/>
            Adicionar agenda
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

export default Schedule;
