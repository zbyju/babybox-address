import { Box, Button, ButtonGroup, Heading, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getDefaultBabybox } from "../../utils/defaultFactory";
import { useState } from "react";
import BabyboxStats from "../../components/Babybox/Stats/BabyboxStats";
import { AddIcon, ArrowRightIcon, ChevronLeftIcon, DownloadIcon, InfoIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { getBabyboxByHandle } from "../../api/babybox/getBabyboxes";
import Link from "next/link"

export default function BabyboxPage() {
    const router = useRouter();
    const { BabyboxPage: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const { data: babybox, } = useSWR("babybox/handle/" + handle, () => getBabyboxByHandle(handle))
    return (
        <>
            <Heading>Babybox {babybox?.name ? babybox.name : handle}</Heading>
            <BabyboxStats babyboxHandle={handle} />

            <Box bg="yellow.300" borderRadius={5} mt={5} boxShadow="lg">
                <Box p={5}>
                    <Heading size="lg" mb={4}>Rozcestník</Heading>
                    <HStack wrap="wrap" spacing="0">
                        <ButtonGroup spacing="0" colorScheme="blue" size="sm" color="white">
                            <Button mt="5px" mr="10px" bg="blue.900" leftIcon={<ChevronLeftIcon w={6} h={6} />} pl={1}>Otevřít databázi adres</Button>
                            <Link href={`/babybox/address/add/${encodeURIComponent(handle)}`}>
                                <Button mt="5px" mr="10px" bg="blue.700" leftIcon={<AddIcon />}>Přidávat další adresy</Button>
                            </Link>
                        </ButtonGroup>

                        <ButtonGroup spacing="0" size="sm">
                            <Button mt="5px" mr="10px" leftIcon={<InfoIcon />} isDisabled>Pokročilé statistiky</Button>
                        </ButtonGroup>

                        <ButtonGroup ml="0px" spacing="0" colorScheme="green" size="sm" color="white">
                            <Button mt="5px" mr="10px" bg="green.900" leftIcon={<DownloadIcon />}>Stáhnout zálohu dat</Button>
                            <Button mt="5px" mr="10px" bg="green.700" leftIcon={<ArrowRightIcon />}>Exportovat data</Button>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}
