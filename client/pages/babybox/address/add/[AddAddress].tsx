import { Heading, HStack, Button, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons"
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressCount } from "../../../../api/address/getAddresses";
import AddAddressForm from "../../../../components/Babybox/AddAddressForm"
import AddressTable from "../../../../components/Babybox/AddressTable";
import AddressesCountStat from "../../../../components/Babybox/Stats/AddressesCountStat";
import Link from "next/link"

export default function AddAddress() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    return (
        <>
            <HStack justify="space-between">
                <VStack align="flex-start">
                    <Heading mb="-3">Přidat adresu</Heading>
                    <Link href={`/babybox/${encodeURIComponent(handle)}`} passHref>
                        <Button size="sm" variant="ghost" colorScheme="blue" pl={0} leftIcon={<ChevronLeftIcon w={6} h={6} ml="-1" mr="-2" pt="2px"/>}>
                            Zpět na rozcestník
                        </Button>
                    </Link>
                </VStack>
                {error ? (
                    <Heading size="md">Chyba při načítání počtu adres</Heading>
                ) : !data ? (
                    <Heading size="md">Načítám počet adres...</Heading>
                ) : (
                    <Heading size="md">Počet adres: {data.length}</Heading>
                )}
            </HStack>
            <AddAddressForm babyboxHandle={handle} />
            <VStack alignItems="flex-start" mb="10">
                <Heading>Nejnovější adresy</Heading>
                {error ? (
                    <Text>Chyba při načítání adres</Text>
                ) : !data ? (
                    <Text>Načítám adresy...</Text>
                ) : (
                    <AddressTable filtering={false} handle={handle} addresses={data.slice(0, 5)}/>
                )}
            </VStack>
        </>
    )
}
