import { Address } from "../../../types/address";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

interface StatsLastPeriodProp {
    title: string,
    addresses: Array<Address>
}

export default function StatsLastPeriod({ title, addresses }: StatsLastPeriodProp) {
    const time = 8 * 31
    const addressLabelPlurality = addresses.length === 1 ? "adresa" : "adres"
    return (
        <Stat flex={0} minW="135px">
            <StatLabel>{title}</StatLabel>
            <StatNumber>{addresses.length} {addressLabelPlurality}</StatNumber>
            <StatHelpText>
                {(addresses.length / time).toFixed(2)} adres/hod.
            </StatHelpText>
        </Stat>
    )
}
