import { Modal, ModalFooter, Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react"
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";

interface EditAddressModalProps {
  address?: Address,
  isOpen: boolean,
  handle: string,
  close: Function
}

export default function EditAddressModal({ address, isOpen, handle, close }: EditAddressModalProps) {
  if (!address) return null
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="4xl" pb="0" mb="-4">Editovat Adresu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditAddressForm babyboxHandle={handle} addressProp={address} close={close} />
        </ModalBody>
      </ModalContent>
    </Modal >
  )
}
