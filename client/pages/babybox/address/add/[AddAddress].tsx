import { Heading, HStack, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressCount } from "../../../../api/address/getAddresses";
import AddAddressForm from "../../../../components/Babybox/AddAddressForm"
import AddressTable from "../../../../components/Babybox/AddressTable";
import AddressesCountStat from "../../../../components/Babybox/Stats/AddressesCountStat";

export default function AddAddress() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    return (
        <>
            <HStack justify="space-between">
                <Heading>Přidat adresu</Heading>
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
