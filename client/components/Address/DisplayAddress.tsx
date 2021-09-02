import { CopyIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement, Button, IconButton, useClipboard } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";

interface DisplayAddressProps {
  address?: Address
}

export default function DisplayAddress({ address }: DisplayAddressProps) {
    const [copyValue, setCopyValue] = useState("")
    const { hasCopied, onCopy } = useClipboard(copyValue)
    useEffect(() => {
        if(copyValue)
            onCopy()
    }, [copyValue])
    if (!address) return null
    const getSalutation = () => {
        return `Milý ${address.sex === "male" ? "pane" : "paní"} ${address.firstname5} ${address.lastname5},`
    }
    return (
        <Box>
            <InputGroup size="md" mb={3} variant="filled">
                <Input isReadOnly readOnly value={getSalutation() || ""}/>
                <InputRightElement>
                    <IconButton aria-label="Kopírovat" colorScheme="yellow" icon={<CopyIcon />} onClick={() => setCopyValue(getSalutation())}/>
                </InputRightElement>
            </InputGroup>

            <InputGroup size="md" mb={3} variant="filled">
                <Input isReadOnly readOnly value={address.email || ""}/>
                <InputRightElement>
                    <IconButton aria-label="Kopírovat" colorScheme="yellow" icon={<CopyIcon />} onClick={() => setCopyValue(address.email)}/>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}
