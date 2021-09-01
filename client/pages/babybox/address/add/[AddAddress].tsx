import { Heading, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressCount } from "../../../../api/address/getAddresses";
import AddAddressForm from "../../../../components/Babybox/AddAddressForm"

export default function AddAddress() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data, error } = useSWR("address/count/handle/" + handle)

    const addressCountJSX = error ? (
        <Heading size="md">Chyba při načítání počtu adres</Heading>
    ) : (!data) ? (
        <Heading size="md">Načítám počet adres...</Heading>
    ) : (<Heading size="md">Počet adres: {data.count}</Heading>)
    return (
        <>
            <HStack justify="space-between">
                <Heading>Přidat adresu</Heading>
                {addressCountJSX}
            </HStack>
            <AddAddressForm babyboxHandle={handle} />
        </>
    )
}
