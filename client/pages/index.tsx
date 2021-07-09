import {Button, Flex, Heading, IconButton} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import AllBabyboxesCardList from "../components/Babybox/AllBabyboxesCardList";
import {Babybox} from "../types/babybox";
import Link from "next/link"
import {useState} from "react";
import ListFastLinks from "../components/Other/ListFastLinks";

export default function Home() {
    const [babyboxesTmp, setBabyboxesTmp] = useState(    [{
        name: "Praha",
        handle: "praha",
        favorite: false
    },{
        name: "Brno",
        handle: "brno",
        favorite: false
    },{
        name: "Ostrava",
        handle: "ostrava",
        favorite: true,
        note: "Toto je poznamka k tomuto babyboxu"
    }]);
    const fastLinks = [{
        label: "Google",
        link: "https://google.com"
    },{
        label: "Justice",
        link: "https://justice.cz"
    },{
        label: "Test",
        link: "https://google.com"
    },{
        label: "zvcx",
        link: "https://google.com"
    },]
    return (
        <>
            <Flex alignItems="center" mb={5}>
                <Heading mr={3}>Babyboxy</Heading>
                <Link href="/babybox/add">
                    <IconButton aria-label="Přidat babybox" mt={1} size="sm" icon={<AddIcon />} />
                </Link>
            </Flex>
            <AllBabyboxesCardList babyboxesProp={babyboxesTmp} />

            <ListFastLinks linksProp={fastLinks} />
        </>
      )

}
