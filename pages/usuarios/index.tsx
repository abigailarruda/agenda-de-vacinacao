import Head from 'next/head';
import type { NextPage } from 'next';
import { Button, Container } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { Table } from 'components/Table';

import { Main } from 'layouts/Main';

const Users: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agenda de Vacinação | Usários</title>
      </Head>

      <Main>
        <Container minWidth="100%" display="flex" justifyContent="flex-end" padding={0}>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="green"
            variant="solid"
            borderRadius="4px"
            fontWeight="medium"
            // onClick={() => modalRef.current?.handleOpenModal()}
          >
            Adicionar usuário
          </Button>
        </Container>

        <Table
          data={[]}
          columns={[]}
          // loading={isValidating}
          paginationServer={false}
          meta={{
            per: 10,
            total: 0,
          }}
        />
      </Main>
    </>
  );
};

export default Users;
