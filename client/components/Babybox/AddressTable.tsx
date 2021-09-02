import { Address } from "../../types/address";
import { IconButton, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogHeader, AlertDialogFooter, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast, Tag } from "@chakra-ui/react";
import { prettyShortAddress, sexToCZ, shortFullname, shortHouseAddress } from "../../utils/address";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { deleteAddress } from "../../api/address/deleteAddress"
import { mutate, trigger } from "swr";
import { triggerAddressesOfHandle, triggerDuplicates } from "../../api/triggers";
import moment from "moment";


interface AddressTableProp {
    addresses: Array<Address>,
    handle: string,
    address?: Address,
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
            if(address)
                triggerDuplicates(handle, address.company, address.email)
            else
                triggerAddressesOfHandle(handle)

            setDeleteDialog({ open: false })
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
    }
    return (
        <>
            <Table size="sm" variant="striped" overflowY="scroll">
                <Thead>
                    <Tr>
                        <Th padding="5px">Vytvořeno</Th>
                        <Th padding="5px">Celé jméno</Th>
                        <Th padding="5px">Pohlaví</Th>
                        <Th padding="5px">Společnost</Th>
                        <Th padding="5px">Email</Th>
                        <Th padding="5px">Adresa</Th>
                        <Th padding="5px">Akce</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {addresses?.map(addr => {
                        return (
                            <Tr key={addr.company}>
                                <Td padding="5px">{moment(addr.createdAt).format("D.M.YY HH:mm:ss")}</Td>
                                <Td padding="5px">{shortFullname(addr)}</Td>
                                <Td padding="5px">{addr.sex === "male" ? (
                                    <Tag colorScheme="blue">Muž</Tag>
                                ) : (
                                    <Tag colorScheme="pink">Žena</Tag>
                                )}</Td>
                                <Td padding="5px">{addr.company}</Td>
                                <Td padding="5px">{addr.email}</Td>
                                <Td padding="5px">{shortHouseAddress(addr)}</Td>
                                <Td padding="5px">
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
