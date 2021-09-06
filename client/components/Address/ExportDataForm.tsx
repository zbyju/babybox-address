import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { Box, Heading, FormLabel, Input, InputGroup, InputRightElement, Button, IconButton, useClipboard, HStack, useToast, FormControl, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Address } from "../../types/address";
import AddAddressForm from "../Babybox/AddAddressForm";
import EditAddressForm from "./EditAddressForm";
import { CSVLink } from "react-csv";
import { getFilename, getHeaders, getSalutationAddresses } from "../../utils/backup";

interface DisplayAddressForEmailProps {
  addresses: Array<Address>
  handle: string
}

type FileFormatType = "csv" | "json"
type FormattingType = "noChange" | "salutation"

export default function ExportDataForm({ addresses, handle }: DisplayAddressForEmailProps) {
  const [fileFormat, setFileFormat] = useState<FileFormatType>("csv")
  const [formatting, setFormatting] = useState<FormattingType>("salutation")
  const [addressesMapped, setAddressesMapped] = useState<Array<any>>(addresses)

  useEffect(() => {
    if(formatting === "salutation")
      setAddressesMapped(getSalutationAddresses(addresses))
    else
      setAddressesMapped(addresses)
  }, [formatting])

  if (!addresses) return null
  return (
    <Box>
      <Heading size="md" mb={1}>Vybrat formát souboru</Heading>
      <FormControl>
        <Select value={fileFormat} onChange={((event) => setFileFormat(event.target.value as FileFormatType))}>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </Select>
      </FormControl>

      <Heading size="md" mb={1} mt={2}>Vybrat formát dat</Heading>
      <FormControl>
        <Select value={formatting} onChange={((event) => setFormatting(event.target.value as FormattingType))}>
          <option value="salutation">Pro dopisy</option>
          <option value="noChange">Beze změny</option>
        </Select>
      </FormControl>
      { fileFormat === "csv" ? (
        <CSVLink data={addressesMapped} headers={getHeaders(formatting)} filename={getFilename("EXPORT", handle, "csv")}>
            <Button mt={5} colorScheme="blue" leftIcon={<DownloadIcon />}>
              Stáhnout
            </Button>
        </CSVLink>
      ) : (
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(addressesMapped))}`}
          download={getFilename("ZALOHA", handle, "json")}>
          <Button mt={5} colorScheme="blue" leftIcon={<DownloadIcon />}>Stáhnout</Button>
        </a>
      )}
    </Box>
  )
}
