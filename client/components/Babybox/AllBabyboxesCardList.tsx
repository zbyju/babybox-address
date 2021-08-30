import { Box, Flex, SkeletonCircle, SkeletonText, Alert, AlertIcon, AlertDescription, AlertTitle, Heading, HStack, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import BabyboxCard from "./BabyboxCard"
import { Babybox } from "../../types/babybox";
import React, { useState } from "react";
import { updateFavorite } from "../../api/babybox/updateFavorite";
import useSWR from 'swr'
import { fetcher } from "../../api/fetcher";
import { getAllBabyboxes } from "../../api/babybox/getBabyboxes";

export default function AllBabyboxesCardList() {
    const { data: babyboxes, error, mutate } = useSWR("babyboxes", () => getAllBabyboxes())
    const toggleFavoriteStar = async (babybox: Babybox) => {
        try {
            const newBabybox = await updateFavorite(babybox)
            const tmp = [...babyboxes].map(x => {
                return x.handle === newBabybox.handle ? newBabybox : x
            })
            mutate(tmp)
        } catch (err) {
            console.log(err)
        }
    }
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
