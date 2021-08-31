import { Heading, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressCount } from "../../../../api/address/getAddresses";
import AddAddressForm from "../../../../components/Babybox/AddAddressForm"

export default function AddAddress() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: addressCount, error } = useSWR("address/count/handle/" + handle, () => getAddressCount(handle))

    const addressCountJSX = error ? (
        <Heading size="md">Chyba při načítání počtu adres</Heading>
    ) : (!addressCount && addressCount !== 0) ? (
        <Heading size="md">Načítám počet adres...</Heading>
    ) : (<Heading size="md">Počet adres: {addressCount}</Heading>)
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
