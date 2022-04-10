import { Box, Container, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      alignItems="center"
      as="footer"
      borderTopColor="gray.200"
      borderTopStyle="solid"
      borderTopWidth="1px"
      display="flex"
      height="80px"
      marginTop="3rem"
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
        <Text textAlign="center" width="100%">
          Agenda de Vacinação. Desenvolvido por Abigail e Jacob.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
