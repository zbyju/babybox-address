import { Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Babybox } from "../../../types/babybox";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import useStarHook from "../../../hooks/useStarHook";
import Link from 'next/link'
import StatsPerPeriod from "./StatsPerPeriod";
import useSWR from "swr";
import { getAllAddresses } from "../../../api/address/getAddresses";

interface BabyboxStatsProp {
    babyboxHandle: string
}

export default function BabyboxStats({ babyboxHandle }: BabyboxStatsProp) {
    const { data: addresses, error } = useSWR("addresses/babybox/handle" + babyboxHandle, () => getAllAddresses(babyboxHandle))
    const addressesSorted = addresses.sort((adr1, adr2) => {
        return adr1.createdAt > adr2.createdAt
    })
    return (
        <Flex justify="space-between" wrap="wrap" mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
            <StatsPerPeriod title="Celkem" addresses={addressesSorted} />
            <StatsPerPeriod title="Tento měsíc" addresses={addresses} />
            <StatsPerPeriod title="Tento týden" addresses={addresses} />
            <StatsPerPeriod title="Minulý týden" addresses={addresses} />
            <StatsPerPeriod title="Dnes" addresses={addresses} />
            <StatsPerPeriod title="Včera" addresses={addresses} />
        </Flex>
    )
}
