import {Box, Button, ButtonGroup, Heading, HStack, VStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getDefaultBabybox} from "../../utils/defaultFactory";
import {useState} from "react";
import BabyboxStats from "../../components/Babybox/Stats/BabyboxStats";
import {AddIcon, ArrowRightIcon, ChevronLeftIcon, DownloadIcon, InfoIcon} from "@chakra-ui/icons";

export default function BabyboxPage() {
    const router = useRouter();
    const { BabyboxPage: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const [babybox, setBabybox] = useState(getDefaultBabybox())
    return (
        <>
            <Heading>Babybox {babybox.name ? babybox.name : handle}</Heading>
            <BabyboxStats babyboxHandle={handle} />

            <Box bg="yellow.300" borderRadius={5} mt={5} boxShadow="lg">
                <Box p={5}>
                    <Heading size="lg" mb={4}>Rozcestník</Heading>
                    <HStack spacing="16px">
                        <ButtonGroup colorScheme="blue" spacing="2" size="sm" color="white">
                            <Button bg="blue.900" leftIcon={<ChevronLeftIcon w={6} h={6}/>} pl={2}>Otevřít databázi adres</Button>
                            <Button bg="blue.700" leftIcon={<AddIcon />}>Přidávat další adresy</Button>
                        </ButtonGroup>

                        <ButtonGroup spacing="2" size="sm">
                            <Button leftIcon={<InfoIcon />} isDisabled>Pokročilé statistiky</Button>
                        </ButtonGroup>

                        <ButtonGroup colorScheme="green" spacing="2" size="sm" color="white">
                            <Button bg="green.900" leftIcon={<DownloadIcon />}>Stáhnout zálohu dat</Button>
                            <Button bg="green.700" leftIcon={<ArrowRightIcon />}>Exportovat data</Button>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}
