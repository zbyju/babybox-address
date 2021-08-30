import { Address } from "../../../types/address";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import moment from "moment";

interface StatsLastPeriodProp {
    title: string,
    addresses: Array<Address>
}

export default function StatsLastPeriod({ title, addresses }: StatsLastPeriodProp) {
    const hoursPerDay = 8
    const addressLabelPlurality = addresses.length === 1 ? "adresa" : addresses.length < 5 ? "adresy" : "adres"
    if (addresses.length === 0) {
        return (
            <Stat flex={0} minW="135px">
                <StatLabel>{title}</StatLabel>
                <StatNumber fontSize="xl" mt={1}>Žádné adresy</StatNumber>
            </Stat>
        )
    }
    const start = moment(addresses[0].createdAt!)
    const end = moment(addresses[addresses.length - 1].createdAt!)
    const days = end.diff(start, "days")
    const hours = end.diff(start, "hours")
    //Substract time not in work from the hours (min is 1 to not divide by 0)
    const time = Math.max(days > 1 ? hours - ((24 - hoursPerDay) * days) : hours, 1)
    console.log(time)
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
