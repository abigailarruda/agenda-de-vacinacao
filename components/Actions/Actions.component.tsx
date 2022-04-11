import { HStack, IconButton } from '@chakra-ui/react';
import { RiEyeLine, RiDeleteBin7Line, RiCalendarCheckFill } from 'react-icons/ri';

interface Props {
  handleView: () => void;
  handleDelete: () => void;
  showWriteOff?: boolean;
  handleWriteOff?: () => void;
}

const Actions = ({ handleView, handleDelete, showWriteOff, handleWriteOff }: Props) => {
  return (
    <HStack spacing="0.25rem">
      {showWriteOff && (
        <IconButton
          aria-label="Dar baixa"
          colorScheme="green"
          icon={<RiCalendarCheckFill />}
          onClick={handleWriteOff}
          size="sm"
          variant="outline"
        />
      )}

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
