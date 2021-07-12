import {Heading, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import {useRouter} from "next/router";

export default function AddAddress() {
    const router = useRouter();
    const { AddAddress: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    return (
        <>
            <Heading>Všechny adresy:</Heading>
        </>
    )
}
