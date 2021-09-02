import { CopyIcon } from "@chakra-ui/icons";
import { Box, Heading, FormLabel, Input, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, useToast, FormControl } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
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
        isClosable: true,
        status: "success"
      })
    }
  }, [copyValue])
  if (!address) return null
  const getSalutation = () => {
    return `${address.sex === "male" ? "Milý" : "Milá"} ${address.sex === "male" ? "pane" : "paní"} ${address.firstname5} ${address.lastname5},`
  }
  return (
    <Box>
      <Heading size="md" mb={1}>Data pro Email</Heading>

      <HStack>
        <FormControl>
          <FormLabel mb={0}>Oslovení</FormLabel>
          <InputGroup size="md" variant="filled">
            <Input isReadOnly readOnly value={getSalutation() || ""} />
            <InputRightElement>
              <IconButton isDisabled={!getSalutation()} aria-label="Kopírovat" colorScheme="yellow" icon={<CopyIcon />} onClick={() => setCopyValue(getSalutation())} />
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
