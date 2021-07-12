import {Address} from "../../../types/address";
import {Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/react";

interface StatsLastPeriodProp {
    title: string,
    addresses: Array<Address>
}

export default function StatsLastPeriod({ title, addresses }: StatsLastPeriodProp) {
    const value = 10200
    const time = 8 * 31
    return (
        <Stat flex={0} minW="135px">
            <StatLabel>{ title }</StatLabel>
            <StatNumber>{value} adres</StatNumber>
            <StatHelpText>
                {(value / time).toFixed(2)} adres/hod.
            </StatHelpText>
        </Stat>
    )
}