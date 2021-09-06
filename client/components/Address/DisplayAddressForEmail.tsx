import { CopyIcon } from "@chakra-ui/icons";
import { Box, Heading, FormLabel, Input, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, useToast, FormControl } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import { getSalutation } from "../../utils/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";

interface DisplayAddressForEmailProps {
  address?: Address
}

export default function DisplayAddressForEmail({ address }: DisplayAddressForEmailProps) {
  const [copyValue, setCopyValue] = useState("")
  const { onCopy } = useClipboard(copyValue)
  const toast = useToast()
  useEffect(() => {
    if (copyValue) {
      onCopy()
      toast({
        title: "Zkopírováno",
        description: "Bylo zkopírováno: " + copyValue,
        duration: 1500,
        isClosable: true,
        status: "success"
      })
    }
  }, [copyValue])
  if (!address) return null
  return (
    <Box>
      <Heading size="md" mb={1}>Data pro Email</Heading>

      <HStack>
        <FormControl>
          <FormLabel mb={0}>Oslovení</FormLabel>
          <InputGroup size="md" variant="filled">
            <Input isReadOnly readOnly value={getSalutation(address) || ""} />
            <InputRightElement>
              <IconButton isDisabled={!getSalutation(address)} aria-label="Kopírovat" colorScheme="yellow" icon={<CopyIcon />} onClick={() => setCopyValue(getSalutation(address))} />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel mb={0}>Email</FormLabel>
          <InputGroup size="md" variant="filled">
            <Input isReadOnly readOnly value={address.email || ""} />
            <InputRightElement>
              <IconButton isDisabled={!address.email} aria-label="Kopírovat" colorScheme="yellow" icon={<CopyIcon />} onClick={() => setCopyValue(address.email)} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
    </Box >
  )
}
