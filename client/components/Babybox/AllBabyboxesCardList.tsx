import { Box, Flex, SkeletonCircle, SkeletonText, Alert, AlertIcon, AlertDescription, AlertTitle, Heading, HStack, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import BabyboxCard from "./BabyboxCard"
import { Babybox } from "../../types/babybox";
import React, { useEffect, useState } from "react";
import { updateFavorite } from "../../api/babybox/updateFavorite";
import useSWR, { mutate, trigger } from 'swr'
import { fetcher } from "../../api/fetcher";
import { getAllBabyboxes } from "../../api/babybox/getBabyboxes";
import axios from "axios";

export default function AllBabyboxesCardList() {
    const { data: babyboxes, error } = useSWR("/babybox")
    const sortBabyboxes = (a: Babybox, b: Babybox) => {
        if (a.favorite && !b.favorite) return -1
        if (!a.favorite && b.favorite) return 1
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
    }
    if (error) return (
        <Alert status="error" mb="3">
            <AlertIcon />
            <AlertTitle mr={2}>Chyba při načítání babyboxů.</AlertTitle>
            <AlertDescription>Zkuste stránku obnovit, pokud problém přetrvává, pak je problém se serverem.</AlertDescription>
        </Alert>
    )
    if (!babyboxes) return (
        <Box boxShadow="lg"
            borderRadius="md"
            p={5} bg="yellow.300"
            mr={5} mb={3}
            maxW="275px">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
    )
    const toggleFavoriteStar = async (babybox: Babybox) => {
        const updatedBabybox = { ...babybox, favorite: !babybox.favorite }
        const updatedBabyboxes = babyboxes.map((x: Babybox) => {
            return x.handle === babybox.handle ? updatedBabybox : x
        })
        mutate("/babybox", updatedBabyboxes, false)
        await axios.put(`/babybox/${babybox._id}/favorite`, updatedBabybox)
        trigger("/babybox")
    }
    return (
        <HStack spacing="0px" wrap="wrap" shouldWrapChildren>
            {babyboxes.sort(sortBabyboxes).map((babybox: Babybox) => {
                return (
                    <BabyboxCard babybox={babybox} key={babybox.handle}
                        starPressed={toggleFavoriteStar} />
                )
            })}
        </HStack>
    )
}
