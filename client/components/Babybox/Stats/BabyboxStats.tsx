import { Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Babybox } from "../../../types/babybox";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import useStarHook from "../../../hooks/useStarHook";
import Link from 'next/link'
import StatsPerPeriod from "./StatsPerPeriod";
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
        <Flex justify="space-between" wrap="wrap" mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
            <StatsPerPeriod title="Celkem" addresses={addresses} />
            <StatsPerPeriod title="Tento měsíc" addresses={thisMonth(addresses)} />
            <StatsPerPeriod title="Tento týden" addresses={thisWeek(addresses)} />
            <StatsPerPeriod title="Minulý týden" addresses={lastWeek(addresses)} />
            <StatsPerPeriod title="Dnes" addresses={todayAddresses(addresses)} />
            <StatsPerPeriod title="Včera" addresses={yesterdayAddresses(addresses)} />
        </Flex>
    )
}
