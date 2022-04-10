import { Text } from '@chakra-ui/react';

interface Props {
  text: string;
}

const Title = ({ text }: Props) => {
  return (
    <Text color="green.500" textTransform="uppercase" fontSize="0.75rem" fontWeight="600" marginBottom="1rem" as="span">
      {text}
    </Text>
  );
};

export default Title;
