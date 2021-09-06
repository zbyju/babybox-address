import { CopyIcon } from "@chakra-ui/icons";
import { Box, Select, Input, FormLabel, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, FormControl, Divider } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressModal from "./EditAddressModal";
import { EditIcon } from "@chakra-ui/icons"
import { inverseDonor, inverseEmail, setDonor } from "../../api/address/putAddress";
import FilterAddressesActions from "./FilterAddressesActions";

interface BrowseAddressesActionsProps {
  address: Address,
  handle: string,
  addresses: Array<Address>,
  setAddresses: Dispatch<SetStateAction<any>>
}

interface AddressDialog {
  open: boolean,
  address?: Address,
}

export default function BrowseAddressesActions({ address, handle, addresses, setAddresses }: BrowseAddressesActionsProps) {
  const [editDialog, setEditDialog] = useState<AddressDialog>({ open: false })
  return (
    <HStack mb={3} alignItems="flex-end">
      <FilterAddressesActions addresses={addresses} setAddresses={setAddresses} />

      <Box height="35px">
        <Divider orientation="vertical" />
      </Box>

      <Button size="sm" isDisabled={!address}
        color="gray.700" bg="yellow.100" _hover={{ bg: "yellow.200" }}
        minW="140px" leftIcon={<EditIcon />} onClick={() => setEditDialog({ open: true, address })} >Editovat adresu</Button>

      <Button size="sm" isDisabled={!address}
        color="gray.700" bg="yellow.200" _hover={{ bg: "yellow.300" }}
        minW="135px" onClick={() => inverseDonor(address)} >Označit jako dárce</Button>

      <Button size="sm" isDisabled={!address}
        color="gray.700" bg="yellow.300" _hover={{ bg: "yellow.400" }}
        minW="115px" onClick={() => inverseEmail(address)} >Email odeslán</Button>

      <EditAddressModal address={editDialog.address} handle={handle} isOpen={editDialog.open} close={() => setEditDialog({ open: false })} />
    </HStack>
  )
}
