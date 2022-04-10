import { Container, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Container
      alignItems="center"
      display="flex"
      height="4rem"
      justifyContent="center"
      minWidth="100%"
      padding={0}
    >
      <Spinner size="md" color="green.500" />
    </Container>
  );
};

export default Loader;
