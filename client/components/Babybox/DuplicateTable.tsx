import {Address} from "../../types/address";
import {IconButton, Table, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {sexToCZ} from "../../utils/address";
import {DeleteIcon} from "@chakra-ui/icons";


interface DuplicateTableProp {
    addresses: Array<Address>
}

export default function DuplicateTable({ addresses }: DuplicateTableProp) {
    return (
        <Table size="sm">
            <Thead>
                <Tr>
                    <Th>Jméno / 5. pád</Th>
                    <Th>Příjmení / 5. pád</Th>
                    <Th>Pohlaví</Th>
                    <Th>Název společnosti</Th>
                    <Th>Email</Th>
                    <Th>Ulice</Th>
                    <Th>Město</Th>
                    <Th>PSČ</Th>
                    <Th>Akce</Th>
                </Tr>
            </Thead>
            <Tbody>
                {addresses.map(addr => {
                    return (
                        <Tr key={addr.company}>
                            <Td>{addr.firstname} / {addr.firstname5}</Td>
                            <Td>{addr.lastname} / {addr.lastname5}</Td>
                            <Td>{sexToCZ(addr.sex)}</Td>
                            <Td>{addr.company}</Td>
                            <Td>{addr.email}</Td>
                            <Td>{addr.street}</Td>
                            <Td>{addr.city}</Td>
                            <Td>{addr.postcode}</Td>
                            <Td>
                                <IconButton aria-label="Smazat adresu" size="xs" colorScheme="red" icon={<DeleteIcon />} />
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}