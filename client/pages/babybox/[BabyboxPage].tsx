import { AddIcon, ArrowRightIcon, ChevronLeftIcon, DownloadIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import BabyboxStats from "../../components/Babybox/Stats/BabyboxStats";
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
                    <Heading size="lg" mb={2}>Rozcestník</Heading>
                    <HStack wrap="wrap">
                        <HStack wrap="wrap" justifyItems="flex-start" alignItems="center">
                            <Link href={`/babybox/address/${encodeURIComponent(handle)}`} passHref>
                                <Button size="sm" mx="0" my="1" bg="blue.900" _hover={{bg: "blue.800"}} color="white" leftIcon={<ChevronLeftIcon w={6} h={6} />} pl={1}>Otevřít databázi adres</Button>
                            </Link>
                            <Link href={`/babybox/address/add/${encodeURIComponent(handle)}`} passHref>
                                <Button size="sm" mx="0" my="1" bg="blue.700" _hover={{bg: "blue.600"}} color="white" leftIcon={<AddIcon />}>Přidávat další adresy</Button>
                            </Link>
                            <Link href={`/babybox/address/browse/${encodeURIComponent(handle)}`} passHref>
                                <Button size="sm" mx="0" my="1" bg="blue.600" _hover={{bg: "blue.500"}} color="white" leftIcon={<SearchIcon />}>Procházet adresy</Button>
                            </Link>

                            {/* <ButtonGroup spacing="0" size="sm">
                                <Button mt="5px" mr="10px" leftIcon={<InfoIcon />} isDisabled>Pokročilé statistiky</Button>
                            </ButtonGroup> */}
                        </HStack>
                        <HStack wrap="wrap" justifyItems="flex-start" alignItems="center">
                            <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(addresses))}`}
                                download={getFilename("ZALOHA", handle, "json")}>
                                <Button size="sm" mx="0" my="1" bg="green.900" _hover={{bg: "green.800"}} color="white" leftIcon={<DownloadIcon />}>
                                    Stáhnout zálohu dat
                                </Button>
                            </a>
                            <Link href={`/babybox/address/export/${encodeURIComponent(handle)}`} passHref>
                                <Button size="sm" mx="0" my="1" bg="green.700" _hover={{bg: "green.600"}} color="white" leftIcon={<ArrowRightIcon />}>Exportovat data</Button>
                            </Link>
                        </HStack>
                    </HStack>
                </Box>
            </Box>

            <BabyboxStats babyboxHandle={handle} />
        </>
    )
}
