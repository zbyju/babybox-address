import { CopyIcon } from "@chakra-ui/icons";
import { Box, Select, Input, FormLabel, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, FormControl } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressModal from "./EditAddressModal";
import { EditIcon } from "@chakra-ui/icons"

interface BrowseAddressesActionsProps {
  address?: Address,
  handle: string,
  donorFilter: ["all" | "donor" | "notDonor", Dispatch<SetStateAction<any>>],
  emailFilter: ["all" | "emailSent" | "emailNotSent", Dispatch<SetStateAction<any>>],
}

interface AddressDialog {
  open: boolean,
  address?: Address,
}

export default function BrowseAddressesActions({ address, handle, donorFilter, emailFilter }: BrowseAddressesActionsProps) {
  const [editDialog, setEditDialog] = useState<AddressDialog>({ open: false })
  return (
    <HStack mb={3} alignItems="flex-end">
      <FormControl>
        <FormLabel fontSize="sm" mb={0}>Filtr dárci</FormLabel>
        <Select size="sm" onChange={(event) => {
          donorFilter[1](event.target.value)
        }}>
          <option value="all">Všichni</option>
          <option value="donor">Jen dárci</option>
          <option value="notDonor">Jen nedárci</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="sm" mb={0}>Filtr dárci</FormLabel>
        <Select size="sm" onChange={(event) => { emailFilter[1](event.target.value) }}>
          <option value="all">Všichni</option>
          <option value="emailSent">Jen email odeslán</option>
          <option value="emailNotSent">Jen email neodeslán</option>
        </Select>
      </FormControl>

      <Button size="sm" isDisabled={!address}
        color="gray.700" bg="yellow.200" _hover={{ bg: "yellow.300" }}
        minW="140px" leftIcon={<EditIcon />} onClick={() => setEditDialog({ open: true, address })} >Editovat adresu</Button>

      <EditAddressModal address={editDialog.address} handle={handle} isOpen={editDialog.open} close={() => setEditDialog({ open: false })} />
    </HStack>
  )
}
