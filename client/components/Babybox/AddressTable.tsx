import { Address } from "../../types/address";
import { IconButton, Button, Tooltip, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogHeader, AlertDialogFooter, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast, Tag, Flex, HStack } from "@chakra-ui/react";
import { prettyShortAddress, sexToCZ, shortFullname, shortHouseAddress } from "../../utils/address";
import { DeleteIcon, EditIcon, AtSignIcon, StarIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { deleteAddress } from "../../api/address/deleteAddress"
import { mutate, trigger } from "swr";
import { triggerAddressesOfHandle, triggerDuplicates } from "../../api/triggers";
import moment from "moment";
import EditAddressModal from "../Address/EditAddressModal";
import FilterAddressesActions from "../Address/FilterAddressesActions";
import { inverseDonor, inverseEmail, inverseMayor } from "../../api/address/putAddress";


interface AddressTableProp {
    addresses: Array<Address>,
    handle: string,
    address?: Address,
    editButton?: boolean,
    filtering?: boolean
}

interface AddressDialog {
    open: boolean,
    address?: Address,
}


export default function AddressTable({ addresses, handle, address, editButton, filtering }: AddressTableProp) {
    const [deleteDialog, setDeleteDialog] = useState<AddressDialog>({ open: false })
    const [editDialog, setEditDialog] = useState<AddressDialog>({ open: false })
    const [addressesFiltered, setAddressesFiltered] = useState<Array<Address>>(addresses)
    const cancelRef = useRef(null)
    const toast = useToast()
    const deleteDialogClicked = async () => {
        if (!deleteDialog.address || !deleteDialog.address._id) return setDeleteDialog({ open: false })
        const addressId = deleteDialog.address._id
        try {
            const result = await deleteAddress(addressId)
            if (address)
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
    useEffect(() => {
        setAddressesFiltered(addresses)
    }, [addresses])
    return (
        <>
            <HStack mb={4}>
                {filtering !== false && <FilterAddressesActions addresses={addresses} setAddresses={setAddressesFiltered} showSearch={true} />}
            </HStack>


            <Table size="sm" variant="striped" overflowY="scroll">
                <Thead>
                    <Tr>
                        <Th padding="5px">Vytvořeno</Th>
                        <Th padding="5px">Celé jméno</Th>
                        <Th padding="5px">Pohlaví</Th>
                        <Th padding="5px">Společnost</Th>
                        <Th padding="5px">Email</Th>
                        <Th padding="5px">Adresa</Th>
                        <Th padding="5px">Značky</Th>
                        <Th padding="5px">Akce</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {addressesFiltered?.map(addr => {
                        return (
                            <Tr key={addr.company}>
                                <Td padding="5px">{moment(addr.createdAt).format("D.M HH:mm:ss")}</Td>
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
                                    <Flex gridGap="5px" wrap="wrap">
                                        {addr.flags?.isDonor === true ? <Tag colorScheme="green">Dárce</Tag> : null}
                                        {addr.flags?.isEmailSent === true ?
                                            <Tag colorScheme="purple">Email odeslán</Tag> :
                                            <Tag colorScheme="orange">Email neodeslán</Tag>
                                        }
                                        {addr.flags?.isMayor === true ? <Tag colorScheme="teal">Starosta</Tag>:null}
                                    </Flex>
                                </Td>
                                <Td paddingLeft="5px" minW="58px" maxW="120px">
                                    <Flex direction="row" wrap="wrap"  mt="-1" justify="flex-start">
                                        <Tooltip label="Smazat adresu" placement="right">
                                            <IconButton aria-label="Smazat adresu" mt="1" size="xs" colorScheme="red" icon={<DeleteIcon />} onClick={() => setDeleteDialog({ open: true, address: addr })} />
                                        </Tooltip>
                                        {editButton !== false ?
                                            <Tooltip label="Editovat adresu" placement="right">
                                                <IconButton aria-label="Editovat adresu" mt="1" size="xs" colorScheme="blue"
                                                    icon={<EditIcon />}
                                                    onClick={() => setEditDialog({ open: true, address: addr })} />
                                            </Tooltip>
                                        : null}
                                        <Tooltip label={addr.flags?.isEmailSent ? "Označit email neodeslán" : "Označit email odeslán"}
                                            placement="right">
                                            <IconButton aria-label="Email ne/odeslán" mt="1" size="xs" colorScheme="yellow" icon={<AtSignIcon />} onClick={() => inverseEmail(addr)} />
                                        </Tooltip>
                                        <Tooltip label={addr.flags?.isDonor ? "Označit není dárce" : "Označit je dárce"}
                                            placement="right">
                                            <Button aria-label="Ne/dárce" size="xs" mt="1" colorScheme="yellow" onClick={() => inverseDonor(addr)}>$</Button>
                                        </Tooltip>
                                        <Tooltip label={addr.flags?.isMayor ? "Označit není starosta" : "Označit je starosta"}
                                            placement="right">
                                            <IconButton aria-label="Ne/starosta" size="xs" mt="1" colorScheme="yellow" onClick={() => inverseMayor(addr)} icon={<StarIcon />} />
                                        </Tooltip>
                                    </Flex>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>


            <EditAddressModal address={editDialog.address} handle={handle} isOpen={editDialog.open} close={() => setEditDialog({ open: false })} />

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
                            <Button onClick={() => setDeleteDialog({ open: false })}>
                                Storno
                            </Button>
                            <Button colorScheme="red" onClick={deleteDialogClicked} ml={3}>
                                Smazat
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
