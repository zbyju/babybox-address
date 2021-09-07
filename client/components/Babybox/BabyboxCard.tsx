import { Box, Button, ButtonGroup, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Babybox } from "../../types/babybox";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import useStarHook from "../../hooks/useStarHook";
import Link from 'next/link'
import useSWR from "swr"

interface BabyboxCardProps {
    babybox: Babybox
    starPressed: any
}

export default function BabyboxCard({ babybox, starPressed }: BabyboxCardProps) {
    const star = useStarHook(babybox, starPressed)
    const { data, error } = useSWR(babybox?._id ? "/address/count/" + babybox._id : null)
    const note = babybox.note ? "Poznámka: " + babybox.note : ""

    const addressCount = error ? (
        <span>Chyba při načítaní počtu adres</span>
    ) : !data ? (
        <span>Načítám počet adres</span>
    ) : <span>{data.count}</span>

    return (
        <Box
            boxShadow="lg"
            borderRadius="md"
            p={5} bg="yellow.300"
            mr={5} mb={5}
            maxW="275px">
            <Flex alignItems="center" justify="space-between">
                <Heading fontSize="2xl" mb={1}>{babybox.name}</Heading>
                {star}
            </Flex>
            <Text>Počet adres: {addressCount}</Text>
            <Text>{note}</Text>
            <ButtonGroup mt={3} colorScheme="blue" spacing="2" size="sm" color="white">
                <Link href={`/babybox/${encodeURIComponent(babybox.handle)}`} passHref>
                    <Button bg="blue.900" pl={0} leftIcon={<ChevronLeftIcon w={6} h={6} />}>
                        Otevřít
                    </Button>
                </Link>

                <Link href={`/babybox/address/add/${encodeURIComponent(babybox.handle)}`} passHref>
                    <Button bg="blue.700" leftIcon={<AddIcon />}>Přidat adresy</Button>
                </Link>
            </ButtonGroup>
        </Box>
    )
}
