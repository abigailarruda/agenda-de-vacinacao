import { Box, Container, Heading, HStack } from '@chakra-ui/react';
import { NavLink } from 'components/NavLink';

const Navbar = () => {
  return (
    <Box
      alignItems="center"
      as="header"
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      display="flex"
      height="80px"
      marginBottom="3rem"
      width="100%"
    >
      <Container
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        maxWidth="960px"
        padding={0}
        width="100%"
      >
        <Heading as="h5" color="green.500" size="sm">
          Agenda de Vacinação
        </Heading>

        <HStack as="nav" spacing="1.5rem">
          <NavLink href="/agenda" activeUrl="agenda">
            Agenda
          </NavLink>

          <NavLink href="/vacinas" activeUrl="vacinas">
            Vacinas
          </NavLink>

          <NavLink href="/usuarios" activeUrl="usuarios">
            Usuários
          </NavLink>

          <NavLink href="/alergias" activeUrl="alergias">
            Alergias
          </NavLink>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
