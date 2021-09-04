import { CopyIcon } from "@chakra-ui/icons";
import { Box, Heading, FormLabel, Input, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, useToast, FormControl } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";

interface DisplayAddressForEmailProps {
  addresses: Array<Address>
}

export default function ExportDataForm({ addresses }: DisplayAddressForEmailProps) {
  if (!addresses) return null
  return (
    <Box>
      <Heading size="md" mb={1}>Data pro Email</Heading>

      <HStack>
        sfd
      </HStack>
    </Box >
  )
}
