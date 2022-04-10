import { HStack, IconButton } from '@chakra-ui/react';
import { RiEyeLine, RiDeleteBin7Line } from 'react-icons/ri';

interface Props {
  handleView: () => void;
  handleDelete: () => void;
}

const Actions = ({ handleView, handleDelete }: Props) => {
  return (
    <HStack spacing="1rem">
      <IconButton
        aria-label="Visualizar"
        colorScheme="blue"
        icon={<RiEyeLine />}
        onClick={handleView}
        size="sm"
        variant="outline"
      />

      <IconButton
        aria-label="Excluir"
        colorScheme="red"
        icon={<RiDeleteBin7Line />}
        onClick={handleDelete}
        size="sm"
        variant="outline"
      />
    </HStack>
  );
};

export default Actions;
