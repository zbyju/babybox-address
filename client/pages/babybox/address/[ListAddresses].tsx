import {Heading, Stack, Skeleton, Alert, AlertIcon, AlertTitle, AlertDescription, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import AddressTable from "../../../components/Babybox/AddressTable"

export default function ListAddresses() {
    const router = useRouter();
    const { ListAddresses: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: addresses, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    return (
        <>
            <Heading mb={5}>Všechny adresy:</Heading>
            {error ? (
                <Alert status="error" mb="3">
                    <AlertIcon />
                    <AlertTitle mr={2}>Chyba při načítání adres.</AlertTitle>
                    <AlertDescription>Zkuste stránku obnovit, pokud problém přetrvává, pak je problém se serverem.</AlertDescription>
                </Alert>
            ) : !addresses ? (
                <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            ) : <AddressTable addresses={addresses} handle={handle}/>}
        </>
    )
}
