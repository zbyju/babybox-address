import { Address } from "../../../types/address";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import moment from "moment";
import { countDistinctHours } from "../../../utils/stats";

interface AddressesPerPeriodProp {
    title: string,
    addresses: Array<Address>
}

export default function AddressesPerPeriod({ title, addresses }: AddressesPerPeriodProp) {
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
    const numberOfDistinctHours = countDistinctHours(addresses)
    return (
        <Stat flex={0} minW="135px">
            <StatLabel>{title}</StatLabel>
            <StatNumber>{addresses.length} {addressLabelPlurality}</StatNumber>
            <StatHelpText>
                {(addresses.length / numberOfDistinctHours).toFixed(2)} adres/hod.
            </StatHelpText>
        </Stat>
    )
}
