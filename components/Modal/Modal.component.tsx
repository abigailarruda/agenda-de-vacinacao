import {
  Modal as ModalContainer, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  open: boolean;
  handleClose: () => void;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  children: React.ReactNode;
  title: string;
}

const Modal = ({ open, handleClose, size, children, title }: Props) => {
  return (
    <ModalContainer isCentered isOpen={open} onClose={handleClose} scrollBehavior="inside" size={size}>
      <ModalOverlay backdropFilter="blur(2px)" />

      <ModalContent>
        <ModalHeader>{title}</ModalHeader>

        <ModalCloseButton size="sm" />

        <ModalBody>{children}</ModalBody>

        <ModalFooter paddingTop={0} />
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
