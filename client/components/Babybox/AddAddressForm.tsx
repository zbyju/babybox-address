import { Babybox } from "../../types/babybox";
import { Address, FormAddressError, FormAddressItemError } from "../../types/address";
import { getDefaultAddress, getDefaultFormErrors } from "../../utils/defaultFactory"
import { useEffect, useRef, useState } from "react";
import {
    Box, Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input, Progress,
    Radio,
    RadioGroup, Circle, VStack, Flex, useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/react";
import {
    calculateProgress,
    isValidCity,
    isValidCompany,
    isValidEmail,
    isValidFirstname,
    isValidLastname, isValidPostcode,
    isValidStreet, isValidSex, isValidTitleInFront, isValidTitleBehind, isValidAddress, concatUnique, prettyShortAddress
} from "../../utils/address";
import AddressTable from "./AddressTable";
import { CheckIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { createAddress } from "../../api/address/createAddress";
import { getFirstname, getLastname } from "../../api/names/getName";
import useSWR, { mutate, trigger } from "swr";
import { triggerAddressesOfHandle, triggerDuplicates } from "../../api/triggers";
import _ from 'lodash'

interface AddAddressFormProp {
    babyboxHandle: string
}

export default function AddAddressForm({ babyboxHandle }: AddAddressFormProp) {
    const [address, setAddress] = useState<Address>(getDefaultAddress())
    const [debouncedAddress, setDebouncedAddress] = useState<Address>(getDefaultAddress())
    const { data: duplicates, error: duplicateError } = useSWR(`/address/duplicate/${babyboxHandle}/${debouncedAddress.company}/${debouncedAddress.email}`)
    const [errors, setErrors] = useState<FormAddressError>(getDefaultFormErrors())
    const [progress, setProgress] = useState<number>(0)
    const toast = useToast()

    const validationFunctions = {
        firstname: isValidFirstname,
        firstname5: isValidFirstname,
        lastname: isValidLastname,
        lastname5: isValidLastname,
        titleInFront: isValidTitleInFront,
        titleBehind: isValidTitleBehind,
        sex: isValidSex,
        email: isValidEmail,
        company: isValidCompany,
        street: isValidStreet,
        city: isValidCity,
        postcode: isValidPostcode
    }


    const updateAddress = (name: string, value: any) => {
        setAddress((prevState: Address) => ({
            ...prevState,
            [name]: value
        }));
        // @ts-ignore
        const valid: FormAddressItemError = validationFunctions[name](value)
        // @ts-ignore
        setErrors((prevState) => ({
            ...prevState,
            [name]: valid
        }))
    }

    const resetValidation = () => setErrors(getDefaultFormErrors)
    const resetForm = () => {
        setAddress(getDefaultAddress())
        setErrors(getDefaultFormErrors())
    }

    const updateProgress = (address: Address, errors: FormAddressError) => setProgress(calculateProgress(address, errors))
    const debouncedAddressUpdate = useRef(_.debounce(setDebouncedAddress, 1000))
    useEffect(() => {
        updateProgress(address, errors)
        debouncedAddressUpdate.current(address)
    }, [address])

    const getFirstnameCase5 = async (name: string) => {
        if (name === "") return
        try {
            const result = await getFirstname(name)
            if (result !== null && result.case5 && result.sex) setAddress((prevAddress) => ({
                ...prevAddress,
                firstname5: result.case5,
                sex: result.sex
            }))
        } catch (err) { console.log(err) }
    }
    const getLastnameCase5 = async (name: string) => {
        if (name === "") return
        try {
            const result = await getLastname(name)
            if (result !== null && result.case5 && result.sex) setAddress((prevAddress) => ({
                ...prevAddress,
                lastname5: result.case5,
                sex: result.sex
            }))
        } catch (err) { console.log(err) }
    }

    const debouncedGetFirstnameCase5 = useRef(_.debounce(getFirstnameCase5, 500))
    const debouncedGetLastnameCase5 = useRef(_.debounce(getLastnameCase5, 500))
    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        updateAddress(name, value)

        if (name === "firstname") debouncedGetFirstnameCase5.current(value)
        if (name === "lastname") debouncedGetLastnameCase5.current(value)
    };

    const submitAddress = async () => {
        if (!isValidAddress(address)) {
            return toast({
                title: "Chyba při přidání adresy.",
                description: "Adresa není validní, je nutné vyplnit všechny povinné pole.",
                status: "error",
                isClosable: true,
            })
        }
        if (duplicates?.length > 0) {
            return toast({
                title: "Chyba při přidání adresy.",
                description: "Adresa je duplicitní s jinou adresou. Je potřeba předchozí adresu nejdříve smazat, nebo tuto adresu nepřidávat.",
                status: "error",
                isClosable: true,
            })
        }
        try {
            const result = await createAddress(address, babyboxHandle)
            triggerDuplicates(babyboxHandle, address.company, address.email)
            resetForm()
            return toast({
                title: "Adresa úspěšně přidána.",
                description: `Byla přidána adresa ${prettyShortAddress(address)}`,
                status: "success",
                isClosable: true,
            })
        } catch (err) {
            console.log(err)
            return toast({
                title: "Při přidávání adresy se vyskytla chyba.",
                description: `Adresa nebyla přidána - zkontrolujte, jestli není adresa duplicitní.`,
                status: "error",
                isClosable: true,
            })
        }
    }

    const duplicateIconJSX = duplicateError ? (
        <Circle size="40px" bg="yellow.400" color="white">
            <WarningTwoIcon />
        </Circle>
    ) : (!duplicates || duplicates.length === 0) ? (
        <Circle size="40px" bg="green.500" color="white">
            <CheckIcon />
        </Circle>
    ) : (
        <Circle size="40px" bg="red.500" color="white">
            <CloseIcon />
        </Circle>
    )

    const duplicateContentJSX = duplicateError ? (
        <Alert status="error" mb="3">
            <AlertIcon />
            <AlertTitle mr={2}>Chyba při načítání duplicit.</AlertTitle>
            <AlertDescription>Zkuste stránku obnovit, pokud problém přetrvává, pak je problém se serverem.</AlertDescription>
        </Alert>
    ) : (!duplicates) ? (
        <></>
    ) : (duplicates && duplicates.length > 0) ? (
        <AddressTable addresses={duplicates || null} handle={babyboxHandle} address={address} />
    ) : (<></>)

    const handleSexChange = (value: string) => updateAddress("sex", value)
    return (
        <Box>
            <Progress colorScheme="green" size="sm" mt={5} value={progress} isAnimated />

            <Heading size="md" mt={3} mb={0}>Osobní údaje</Heading>

            <HStack alignItems="flex-start" mt={1}>
                <FormControl id="firstname" isRequired isInvalid={errors?.firstname.isError}>
                    <FormLabel>Jméno</FormLabel>
                    <Input value={address.firstname} name="firstname" onChange={handleChange} />
                    <FormErrorMessage>{errors?.firstname.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl id="lastname" isRequired isInvalid={errors?.lastname.isError}>
                    <FormLabel>Příjmení</FormLabel>
                    <Input value={address.lastname} name="lastname" onChange={handleChange} />
                    <FormErrorMessage>{errors?.lastname.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl minW="180px" flex={1} id="sex" isRequired isInvalid={errors?.sex.isError}>
                    <FormLabel>Pohlaví</FormLabel>
                    <RadioGroup value={address.sex} onChange={handleSexChange} defaultValue="male" name="sex">
                        <HStack spacing="16px" mt={4} justify="center" alignItems="flex-start">
                            <Radio id="male" name="sex" value="male">Muž</Radio>
                            <Radio id="female" name="sex" value="female">Žena</Radio>
                        </HStack>
                    </RadioGroup>
                    <FormErrorMessage>{errors?.sex.message || ""}</FormErrorMessage>
                </FormControl>
            </HStack>

            <HStack alignItems="flex-start" mt={2}>
                <FormControl id="firstname5" isRequired isInvalid={errors?.firstname5.isError}>
                    <FormLabel>Jméno - 5. pád</FormLabel>
                    <Input value={address.firstname5} name="firstname5" onChange={handleChange} />
                    <FormErrorMessage>{errors?.firstname5.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl id="lastname5" isRequired isInvalid={errors?.lastname5.isError}>
                    <FormLabel>Příjmení - 5. pád</FormLabel>
                    <Input value={address.lastname5} name="lastname5" onChange={handleChange} />
                    <FormErrorMessage>{errors?.lastname5.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl minW="180px" flex={1} id="titleInFront" isInvalid={errors?.titleInFront.isError}>
                    <FormLabel>Titul před jménem</FormLabel>
                    <Input value={address.titleInFront} name="titleInFront" onChange={handleChange} />
                    <FormErrorMessage>{errors?.titleInFront.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl minW="180px" flex={1} id="titleBehind" isInvalid={errors?.titleBehind.isError}>
                    <FormLabel>Titul za jménem</FormLabel>
                    <Input value={address.titleBehind} name="titleBehind" onChange={handleChange} />
                    <FormErrorMessage>{errors?.titleBehind.message || ""}</FormErrorMessage>
                </FormControl>
            </HStack>

            <Heading size="md" mt={5} mb={2}>Společnost</Heading>

            <HStack alignItems="flex-start">
                <FormControl id="company" isRequired isInvalid={errors?.company.isError}>
                    <FormLabel>Název společnosti</FormLabel>
                    <Input value={address.company} name="company" onChange={handleChange} />
                    <FormErrorMessage>{errors?.company.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={errors?.email.isError}>
                    <FormLabel>Email</FormLabel>
                    <Input value={address.email} name="email" onChange={handleChange} />
                    <FormErrorMessage>{errors?.email.message || ""}</FormErrorMessage>
                </FormControl>
            </HStack>

            <Heading size="md" mt={5} mb={2}>Adresa</Heading>

            <HStack alignItems="flex-start">
                <FormControl id="street" isRequired isInvalid={errors?.street.isError}>
                    <FormLabel>Ulice</FormLabel>
                    <Input value={address.street} name="street" onChange={handleChange} />
                    <FormErrorMessage>{errors?.street.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl id="city" isRequired isInvalid={errors?.city.isError}>
                    <FormLabel>Město</FormLabel>
                    <Input value={address.city} name="city" onChange={handleChange} />
                    <FormErrorMessage>{errors?.city.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl flex={1} minW="200px" id="postcode" isRequired isInvalid={errors?.postcode.isError}>
                    <FormLabel>PSČ</FormLabel>
                    <Input value={address.postcode} name="postcode" onChange={handleChange} />
                    <FormErrorMessage>{errors?.postcode.message || ""}</FormErrorMessage>
                </FormControl>
            </HStack>

            <HStack mt={5} justify="space-between">
                <HStack>
                    <Button onClick={resetForm} colorScheme="red" variant="outline">Resetovat Formulář</Button>
                    <Button onClick={resetValidation} colorScheme="yellow" variant="outline">Resetovat Validaci</Button>
                </HStack>
                <HStack>
                    <Button colorScheme="green" onClick={submitAddress}>Uložit</Button>
                </HStack>
            </HStack>
            <VStack mt={10} mb={6} alignItems="flex-start">
                <HStack justifyContent="flex-start" mb="3">
                    <Heading mr={2}>Duplicity</Heading>
                    {duplicateIconJSX}
                </HStack>
                {duplicateContentJSX}
            </VStack>

        </Box>

    )
}
