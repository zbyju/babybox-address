import { Box, Button, ButtonGroup, Heading, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getDefaultBabybox } from "../../utils/defaultFactory";
import { useState } from "react";
import BabyboxStats from "../../components/Babybox/Stats/BabyboxStats";
import { AddIcon, ArrowRightIcon, SearchIcon, ChevronLeftIcon, DownloadIcon, InfoIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { getBabyboxByHandle } from "../../api/babybox/getBabyboxes";
import Link from "next/link"
import moment from "moment";
import { getFilename } from "../../utils/backup";

export default function BabyboxPage() {
    const router = useRouter();
    const { BabyboxPage: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: babybox, } = useSWR(handle ? "/babybox/handle/" + handle : null)
    const { data: addresses } = useSWR(handle ? "/address/babybox/handle/" + handle : null)
    return (
        <>
            <Heading>Babybox {babybox?.name ? babybox.name : handle}</Heading>

            <Box bg="yellow.300" borderRadius={5} mt={5} boxShadow="lg">
                <Box p={5}>
                    <Heading size="lg" mb={4}>Rozcestník</Heading>
                    <HStack wrap="wrap" spacing="0">
                        <ButtonGroup spacing="0" colorScheme="blue" size="sm" color="white">
                            <Link href={`/babybox/address/${encodeURIComponent(handle)}`} passHref>
                                <Button mt="5px" mr="10px" bg="blue.900" leftIcon={<ChevronLeftIcon w={6} h={6} />} pl={1}>Otevřít databázi adres</Button>
                            </Link>
                            <Link href={`/babybox/address/add/${encodeURIComponent(handle)}`} passHref>
                                <Button mt="5px" mr="10px" bg="blue.700" leftIcon={<AddIcon />}>Přidávat další adresy</Button>
                            </Link>
                            <Link href={`/babybox/address/browse/${encodeURIComponent(handle)}`} passHref>
                                <Button mt="5px" mr="10px" bg="blue.600" leftIcon={<SearchIcon />}>Procházet adresy</Button>
                            </Link>
                        </ButtonGroup>

                        {/* <ButtonGroup spacing="0" size="sm">
                            <Button mt="5px" mr="10px" leftIcon={<InfoIcon />} isDisabled>Pokročilé statistiky</Button>
                        </ButtonGroup> */}

                        <ButtonGroup ml="0px" spacing="0" colorScheme="green" size="sm" color="white">
                            <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(addresses))}`}
                                download={getFilename("ZALOHA", handle, "json")}>
                                <Button mt="5px" mr="10px" bg="green.900" leftIcon={<DownloadIcon />}>
                                    Stáhnout zálohu dat
                                </Button>
                            </a>
                            <Link href={`/babybox/address/export/${encodeURIComponent(handle)}`} passHref>
                                <Button mt="5px" mr="10px" bg="green.700" leftIcon={<ArrowRightIcon />}>Exportovat data</Button>
                            </Link>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </Box>

            <BabyboxStats babyboxHandle={handle} />
        </>
    )
}
