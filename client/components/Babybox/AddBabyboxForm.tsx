import { Babybox } from "../../types/babybox";
import { Address, FormAddressError, FormAddressItemError } from "../../types/address";
import { getDefaultAddress, getDefaultBabybox, getDefaultFormErrors } from "../../utils/defaultFactory"
import { useEffect, useState } from "react";
import {
    Box, Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input, Progress,
    Radio,
    RadioGroup, Circle, VStack, Flex, Textarea, Spacer, useToast
} from "@chakra-ui/react";
import { createBabybox } from "../../api/babybox/createBabybox";
import React from "react";

export default function AddBabyboxForm() {
    const toast = useToast()
    const [babybox, setBabybox] = useState(getDefaultBabybox())
    const [errors, setErrors] = useState({
        name: {
            isError: false,
            message: ""
        }
    })

    const updateBabybox = (name: string, value: any) => {
        setBabybox((prevState: Babybox) => ({
            ...prevState,
            [name]: value
        }));
        // Change this if more validation is added
        if (name === "name" && value === "") {
            setErrors({
                name: {
                    isError: true,
                    message: "Jméno babyboxu je prázdné."
                }
            })
        }
    }

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const { name, value } = e.target;
        updateBabybox(name, value)
    };

    const submitBabybox = async () => {
        try {
            const result = await createBabybox(babybox)
            return toast({
                title: "Babybox vytvořen.",
                description: `Byl vytvořen babybox s názvem ${babybox.name}.`,
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Box>
            <VStack alignItems="flex-start" mt={4}>
                <FormControl id="name" isRequired isInvalid={errors?.name.isError}>
                    <FormLabel>Jméno Babyboxu</FormLabel>
                    <Input value={babybox.name} name="name" onChange={handleChange} />
                    <FormErrorMessage>{errors?.name.message || ""}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} id="note">
                    <FormLabel>Poznámka</FormLabel>
                    <Textarea value={babybox.note} name="note" onChange={handleChange} />
                </FormControl>
            </VStack>
            <Flex mt={5} justifyContent="flex-end">
                <Button colorScheme="green" onClick={submitBabybox}>Uložit</Button>
            </Flex>
        </Box>

    )
}
