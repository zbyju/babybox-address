import { Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import AllBabyboxesCardList from "../components/Babybox/AllBabyboxesCardList";
import { Babybox } from "../types/babybox";
import Link from "next/link"
import { useState } from "react";
import ListFastLinks from "../components/Other/ListFastLinks";
import useSWR from 'swr'
import { fetcher } from "../api/fetcher";

export default function Home() {
    const fastLinks = [{
        label: "Google",
        link: "https://google.com"
    }, {
        label: "Justice",
        link: "https://or.justice.cz/ias/ui/rejstrik-$firma"
    }, {
        label: "Živé firmy",
        link: "https://www.zivefirmy.cz/"
    }]
    return (
        <>
            <Flex alignItems="center" mb={5}>
                <Heading mr={3}>Babyboxy</Heading>
                <Link href="/babybox/add" passHref>
                    <IconButton aria-label="Přidat babybox" mt={1} size="sm" icon={<AddIcon />} />
                </Link>
            </Flex>

            <AllBabyboxesCardList />

            <ListFastLinks linksProp={fastLinks} />
        </>
    )
}
