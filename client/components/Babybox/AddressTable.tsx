import { Address } from "../../types/address";
import { IconButton, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogHeader, AlertDialogFooter, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { prettyShortAddress, sexToCZ } from "../../utils/address";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { deleteAddress } from "../../api/address/deleteAddress"
import { mutate, trigger } from "swr";
import { triggerAddressesOfHandle, triggerDuplicates } from "../../api/triggers";


interface AddressTableProp {
    addresses: Array<Address>,
    handle: string,
    address: Address,
}

interface AddressDialog {
    open: boolean,
    address?: Address,
}

export default function AddressTable({ addresses, handle, address }: AddressTableProp) {
    const [deleteDialog, setDeleteDialog] = useState<AddressDialog>({ open: false })
    const cancelRef = useRef()
    const toast = useToast()
    const deleteDialogClicked = async () => {
        if (!deleteDialog.address || !deleteDialog.address._id) return setDeleteDialog({ open: false })
        const addressId = deleteDialog.address._id
        try {
            const result = await deleteAddress(addressId)
            triggerDuplicates(handle, address.company, address.email)
            return toast({
                title: "Adresa úspěšně smazána.",
                description: `Byla smazána adresa ${prettyShortAddress(address)}`,
                status: "success",
                isClosable: true,
            })
        } catch (err) {
            return toast({
                title: "Při mazání adresy se vyskytla chyba.",
                description: `Adresa nebyla přidána - zkontrolujte, jestli není adresa duplicitní.`,
                status: "error",
                isClosable: true,
            })
        }
        return setDeleteDialog({ open: false })
    }
    return (
        <>
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
                    {addresses?.map(addr => {
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
                                    <IconButton aria-label="Smazat adresu" size="xs" colorScheme="red" icon={<DeleteIcon />} onClick={() => setDeleteDialog({ open: true, address: addr })} />
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>




            <AlertDialog
                isOpen={deleteDialog.open}
                leastDestructiveRef={cancelRef}
                onClose={() => setDeleteDialog({ open: false })}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Odstranit adresu
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Doopravdy chcete odstranit adresu {prettyShortAddress(deleteDialog.address)}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setDeleteDialog({ open: false })}>
                                Storno
                            </Button>
                            <Button colorScheme="red" onClick={deleteDialogClicked} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
