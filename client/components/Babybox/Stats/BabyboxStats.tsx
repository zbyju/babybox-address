import {Box, Button, ButtonGroup, Center, Flex, Heading, HStack, Text} from "@chakra-ui/react";
import {Babybox} from "../../../types/babybox";
import {AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import useStarHook from "../../../hooks/useStarHook";
import Link from 'next/link'
import StatsLastPeriod from "./StatsLastPeriod";

interface BabyboxStatsProp {
    babyboxHandle: string
}

export default function BabyboxStats({ babyboxHandle }: BabyboxStatsProp) {
    return (
        <Flex justify="space-between" mt={5} p={3} bg="whitesmoke" borderRadius={5} boxShadow="md">
            <StatsLastPeriod title="Celkem" addresses={[]} />
            <StatsLastPeriod title="Tento měsíc" addresses={[]} />
            <StatsLastPeriod title="Tento týden" addresses={[]} />
            <StatsLastPeriod title="Minulý týden" addresses={[]} />
            <StatsLastPeriod title="Dnes" addresses={[]} />
            <StatsLastPeriod title="Včera" addresses={[]} />
        </Flex>
    )
}