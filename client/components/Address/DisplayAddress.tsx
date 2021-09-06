import { CopyIcon } from "@chakra-ui/icons";
import { Box, Input, Checkbox, FormLabel, Heading, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, FormControl } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";

interface DisplayAddressProps {
    address?: Address
}

export default function DisplayAddress({ address }: DisplayAddressProps) {
    if (!address) return null
    return (
        <Box mb={3}>
            <Heading size="md">Adresa</Heading>
            <HStack>
                <FormControl minW="120px" flex={1}>
                    <FormLabel mb={0}>Titul před</FormLabel>
                    <Input isReadOnly variant="filled" value={address.titleInFront || ""} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Jméno</FormLabel>
                    <Input isReadOnly variant="filled" value={address.firstname} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Příjmení</FormLabel>
                    <Input isReadOnly variant="filled" value={address.lastname} />
                </FormControl>
                <FormControl minW="120px" flex={1}>
                    <FormLabel mb={0}>Titul za</FormLabel>
                    <Input isReadOnly variant="filled" value={address.titleBehind || ""} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Jméno 5. pád</FormLabel>
                    <Input isReadOnly variant="filled" value={address.firstname5} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Příjmení 5. pád</FormLabel>
                    <Input isReadOnly variant="filled" value={address.lastname5} />
                </FormControl>
            </HStack>

            <HStack>
                <FormControl>
                    <FormLabel mb={0}>Společnost</FormLabel>
                    <Input isReadOnly variant="filled" value={address.company} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Email</FormLabel>
                    <Input isReadOnly variant="filled" value={address.email || ""} />
                </FormControl>
            </HStack>

            <HStack>
                <FormControl>
                    <FormLabel mb={0}>Ulice</FormLabel>
                    <Input isReadOnly variant="filled" value={address.street} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>Město</FormLabel>
                    <Input isReadOnly variant="filled" value={address.city} />
                </FormControl>
                <FormControl>
                    <FormLabel mb={0}>PSČ</FormLabel>
                    <Input isReadOnly variant="filled" value={address.postcode} />
                </FormControl>
            </HStack>

            <HStack mt={2}>
                <FormLabel mb={0} mr={0} color="grey" fontWeight="400">Je dárcem?</FormLabel>
                <Checkbox isDisabled isChecked={address.flags?.isDonor || false} />
                <FormLabel mb={0} pl="5" mr={0} color="grey" fontWeight="400">Email odeslán?</FormLabel>
                <Checkbox isDisabled isChecked={address.flags?.isEmailSent || false} />
            </HStack>
        </Box>
    )
}
