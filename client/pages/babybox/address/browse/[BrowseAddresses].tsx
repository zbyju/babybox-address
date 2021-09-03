import { Button, Alert, AlertIcon, AlertTitle, AlertDescription, Heading, HStack, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, ListItem, Text, UnorderedList, Divider } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DisplayAddress from "../../../../components/Address/DisplayAddress"
import DisplayAddressForEmail from "../../../../components/Address/DisplayAddressForEmail";
import BrowseAddressesActions from "../../../../components/Address/BrowseAddressesActions";
import { add } from "lodash";
import { filterByDonor, filterByEmail } from "../../../../utils/address";

export default function BrowseAddresses() {
    const router = useRouter();
    const { BrowseAddresses: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: addresses, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    const [index, setIndex] = useState<number>(1)
    const donorFilter = useState<"all" | "donor" | "notDonor">("all")
    const emailFilter = useState<"all" | "emailSent" | "emailNotSent">("all")
    const [address, setAddress] = useState(addresses && (index || index === 0) ? addresses[index - 1] : null)
    const [addressesFiltered, setAddressesFiltered] = useState(addresses)
    useEffect(() => {
        if (addressesFiltered && index >= 1 && index <= addressesFiltered.length) setAddress(addressesFiltered[index - 1])
    }, [addressesFiltered, index])
    useEffect(() => {
        console.log("setting to: ", filterByDonor(filterByEmail(addresses, emailFilter[0]), donorFilter[0]))
        setAddressesFiltered(filterByDonor(filterByEmail(addresses, emailFilter[0]), donorFilter[0]))
    }, [addresses, donorFilter[0], emailFilter[0]])
    const prevAddress = () => {
        if (index > 1)
            setIndex(index - 1)
    }
    const nextAddress = () => {
        if (index < addressesFiltered?.length)
            setIndex(index + 1)
    }
    return (
        <>
            <VStack justify="flex-start" alignItems="flex-start" mb="5">
                <Heading mb="-3">Procházení adres</Heading>
                {addressesFiltered?.length > 0 ?
                    <Heading size="sm" fontWeight="300">Adresa {index}/{addressesFiltered?.length}</Heading>
                    :
                    <Heading size="sm" fontWeight="300">Adresa -/-</Heading>}
                <BrowseAddressesActions address={address} handle={handle} donorFilter={donorFilter} emailFilter={emailFilter} />
                <Divider />
            </VStack>
            {addressesFiltered?.length > 0 ? (
                <>
                    <DisplayAddress address={address} />
                    <DisplayAddressForEmail address={address} />
                    <HStack justify="space-between" mt={6}>
                        <Button isDisabled={index == 1} colorScheme="blue" bg="blue.700" leftIcon={<ArrowBackIcon />} onClick={prevAddress}>Předchozí</Button>
                        <NumberInput value={index} size="sm" maxW={24} min={1} max={addressesFiltered?.length || 1} onChange={(value) => setIndex(parseInt(value) || 0)}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Button isDisabled={index >= addressesFiltered?.length} colorScheme="blue" bg="blue.500" rightIcon={<ArrowForwardIcon />} onClick={nextAddress}>Další</Button>
                    </HStack>
                </>
            ) : (
                <Alert status="info" mb="3">
                    <AlertIcon />
                    <AlertTitle mr={2}>Nebyly nalezeny žádné adresy</AlertTitle>
                    <AlertDescription>Adresy není možné procházet, protože nebyly nalezeny žádné adrey odpovídající zadaným filtrům.</AlertDescription>
                </Alert>
            )}
        </>
    )
}
