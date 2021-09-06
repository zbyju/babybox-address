import { Address } from "../../../types/address";
import { Text, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import moment from "moment";

interface AddressesCountStatProp {
  title: string,
  addresses: Array<Address>
}

export default function AddressesCountStat({ title, addresses }: AddressesCountStatProp) {
  const addressLabelPlurality = addresses.length === 1 ? "adresa" : addresses.length < 5 ? "adresy" : "adres"
  return (
    <Stat flex={0} minW="145px">
      <StatLabel>{title}</StatLabel>
      <StatNumber>{addresses.length > 0 ?
        (<>{addresses.length} {addressLabelPlurality}</>)
        :
        <Text fontSize="xl">Žádné adresy</Text>}
      </StatNumber>
    </Stat>
  )
}
