import { Heading, HStack, Alert, AlertIcon, AlertTitle, AlertDescription, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAddressCount } from "../../../../api/address/getAddresses";
import ExportDataForm from "../../../../components/Address/ExportDataForm"

export default function ExportData() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: addresses, error } = useSWR(handle ? "/address/babybox/handle/" + handle : null)

    return (
        <>
            <HStack justify="space-between" mb="3">
                <Heading>Exporasftovat data</Heading>
                <Text>safd {addresses?.length || addresses?.toString()}</Text>
            </HStack>
            { error ? (
                <Alert status="error" mb="3">
                    <AlertIcon />
                    <AlertTitle mr={2}>Chyba při načítání adres.</AlertTitle>
                    <AlertDescription>Zkuste stránku obnovit, pokud problém přetrvává, pak je problém se serverem.</AlertDescription>
                </Alert>
            ) : addresses?.length === 0 ? (
                <Alert status="warning" mb="3">
                    <AlertIcon />
                    <AlertTitle mr={2}>Tento babybox nemá žádné adresy.</AlertTitle>
                    <AlertDescription>Zkontrolujte zda byly pro tento babybox vytvořeny nějaké adresy.</AlertDescription>
                </Alert>
            ) : !addresses ? (
                <Alert status="info" mb="3">
                    <AlertIcon />
                    <AlertTitle mr={2}>Načítám adresy...</AlertTitle>
                    <AlertDescription>Chvilku strpení, adresy se načítají.</AlertDescription>
                </Alert>
            ) : (
                <ExportDataForm addresses={addresses} />
            )}
        </>
    )
}
