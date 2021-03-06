import { CopyIcon } from "@chakra-ui/icons";
import { Box, Select, Input, FormLabel, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, FormControl, Divider } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressModal from "./EditAddressModal";
import { EditIcon } from "@chakra-ui/icons"
import { inverseDonor, inverseEmail, setDonor } from "../../api/address/putAddress";
import { filterByDonor, filterByEmail, filterBySearch } from "../../utils/address";
import _ from 'lodash'

interface FilterAddressesActionsProps {
  addresses: Array<Address>,
  setAddresses: Dispatch<SetStateAction<any>>,
  showSearch: boolean
}

type donorFilterType = "all" | "donor" | "notDonor"
type emailFilterType = "all" | "emailSent" | "emailNotSent"

export default function FilterAddressesActions({ addresses, setAddresses, showSearch }: FilterAddressesActionsProps) {
  const [donorFilter, setDonorFilter] = useState<donorFilterType>("all")
  const [emailFilter, setEmailFilter] = useState<emailFilterType>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  useEffect(() => {
    setAddresses(
      filterBySearch(
        filterByDonor(
          filterByEmail(addresses, emailFilter),
        donorFilter),
      searchQuery)
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorFilter, emailFilter, searchQuery])

  const debounceSetSearch = _.debounce((event) => {
    setSearchQuery(event.target.value)
  }, 700)

  return (
    <HStack alignItems="flex-end">
      <FormControl id="selectDonors">
        <FormLabel fontSize="sm" mb={0}>Filtr dárci</FormLabel>
        <Select size="sm" onChange={(event) => {
          setDonorFilter((event.target.value as donorFilterType))
        }}>
          <option value="all">Všichni</option>
          <option value="donor">Jen dárci</option>
          <option value="notDonor">Jen nedárci</option>
        </Select>
      </FormControl>

      <FormControl id="selectEmailSent">
        <FormLabel fontSize="sm" mb={0}>Filtr email</FormLabel>
        <Select size="sm" onChange={(event) => { setEmailFilter((event.target.value as emailFilterType))}}>
          <option value="all">Všichni</option>
          <option value="emailSent">Jen email odeslán</option>
          <option value="emailNotSent">Jen email neodeslán</option>
        </Select>
      </FormControl>

      {showSearch &&
        <FormControl id="inputSearchQuery">
          <FormLabel fontSize="sm" mb={0}>Vyhledat adresu</FormLabel>
          <Input size="sm"
            onChange={(event) => { debounceSetSearch(event) }} />
        </FormControl>
      }
    </HStack>
  )
}
