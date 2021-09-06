import { Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Babybox } from "../../../types/babybox";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import useStarHook from "../../../hooks/useStarHook";
import Link from 'next/link'
import AddressesPerPeriod from "./AddressesPerPeriod";
import AddressesCountStat from "./AddressesCountStat";
import useSWR from "swr";
import { getAllAddresses } from "../../../api/address/getAddresses";
import { Address } from "../../../types/address";
import { lastWeek, thisMonth, thisWeek, todayAddresses, yesterdayAddresses } from "../../../utils/stats";

interface BabyboxStatsProp {
    babyboxHandle: string
}

export default function BabyboxStats({ babyboxHandle }: BabyboxStatsProp) {
    const { data: addresses, error } = useSWR(babyboxHandle ? "/address/babybox/handle/" + babyboxHandle : null)
    if (error) return (
        <Flex justify="space-between" wrap="wrap" mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
            <Heading>Chyba při načítání statistik.</Heading>
        </Flex>
    )
    if (!addresses) return (
        <Flex justify="space-between" wrap="wrap" mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
            <Heading>Načítám statistiky.</Heading>
        </Flex>
    )
    return (
        <>
            <Box mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
                <Heading mb="3" size="lg">Rychlost přidávání adres</Heading>
                <Flex justify="space-between" wrap="wrap">
                    <AddressesPerPeriod title="Celkem" addresses={addresses} />
                    <AddressesPerPeriod title="Tento měsíc" addresses={thisMonth(addresses)} />
                    <AddressesPerPeriod title="Tento týden" addresses={thisWeek(addresses)} />
                    <AddressesPerPeriod title="Minulý týden" addresses={lastWeek(addresses)} />
                    <AddressesPerPeriod title="Dnes" addresses={todayAddresses(addresses)} />
                    <AddressesPerPeriod title="Včera" addresses={yesterdayAddresses(addresses)} />
                </Flex>
            </Box>

            <Box mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
                <Heading mb="3" size="lg">Počty adres</Heading>
                <Flex justify="space-between" wrap="wrap">
                    <AddressesCountStat title="Celkem" addresses={addresses} />
                    <AddressesCountStat title="Mužů" addresses={addresses.filter((a: Address) => a.sex === "male")} />
                    <AddressesCountStat title="Žen" addresses={addresses.filter((a: Address) => a.sex === "female")} />
                    <AddressesCountStat title="Adres s emailem" addresses={addresses.filter((a: Address) => a.email)} />
                    <AddressesCountStat title="Odeslaných Emailů" addresses={addresses.filter((a: Address) => a.flags?.isEmailSent)} />
                    <AddressesCountStat title="Neodeslaných Emailů" addresses={addresses.filter((a: Address) => !a.flags?.isEmailSent)} />
                    <AddressesCountStat title="Dárců" addresses={addresses.filter((a: Address) => a.flags?.isDonor)} />
                </Flex>
            </Box>
        </>
    )
}
