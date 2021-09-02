import { Button, Heading, HStack, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DisplayAddress from "../../../../components/Address/DisplayAddress"

export default function BrowseAddresses() {
    const router = useRouter();
    const { BrowseAddresses: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: addresses, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    const [index, setIndex] = useState<number>(1)
    const [address, setAddress] = useState(addresses && (index || index === 0) ? addresses[index - 1] : null)
    useEffect(() => {
        if(addresses && index >= 1 && index <= addresses.length) setAddress(addresses[index - 1])
    }, [addresses, index])
    const prevAddress = () => {
        if(index > 1)
            setIndex(index - 1)
    }
    const nextAddress = () => {
        if(index < addresses?.length)
            setIndex(index + 1)
    }
    return (
        <>
            <VStack justify="flex-start" alignItems="flex-start" mb="5">
                <Heading mb="-3">Procházení adres</Heading>
                <Heading size="sm" fontWeight="300">Adresa #{index}</Heading>
            </VStack>
            <DisplayAddress address={address} />
            <HStack justify="space-between" mt={6}>
                <Button colorScheme="blue" bg="blue.700" leftIcon={<ArrowBackIcon />} onClick={prevAddress}>Předchozí</Button>
                <NumberInput value={index} size="sm" maxW={24} min={1} max={addresses?.length || 1} onChange={(value) => setIndex(parseInt(value) || 0)}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="blue" bg="blue.500" rightIcon={<ArrowForwardIcon />} onClick={nextAddress}>Další</Button>
            </HStack>
        </>
    )
}
