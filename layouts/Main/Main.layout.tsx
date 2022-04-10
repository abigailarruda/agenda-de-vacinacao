import { VStack } from '@chakra-ui/react';

import { Footer } from 'components/Footer';
import { Navbar } from 'components/Navbar';

interface Props {
  children: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <VStack
        align="flex-start"
        as="main"
        margin="0 auto"
        maxWidth="960px"
        spacing="3rem"
        width="100%"
      >
        {children}
      </VStack>

      <Footer />
    </>
  );
};

export default Main;
