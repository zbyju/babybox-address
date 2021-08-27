import {Box, Flex, HStack, Stack, Wrap, WrapItem} from "@chakra-ui/react";
import BabyboxCard from "./BabyboxCard"
import {Babybox} from "../../types/babybox";
import {useState} from "react";
import { updateFavorite } from "../../api/babybox/updateFavorite";
import useSWR from 'swr'
import { fetcher } from "../../api/fetcher";
import { getAllBabyboxes } from "../../api/babybox/getBabyboxes";

interface BabyboxesListProps {
    babyboxesProp: Array<Babybox>
}

export default function AllBabyboxesCardList({ babyboxesProp }: BabyboxesListProps) {
    const {data: babyboxes, error, mutate} = useSWR("babyboxes", () => getAllBabyboxes())
    const toggleFavoriteStar = async (babybox: Babybox) => {
        try {
            const newBabybox = await updateFavorite(babybox)
            const tmp = [...babyboxes].map(x => {
                return x.handle === newBabybox.handle ? newBabybox : x
            })
            mutate(tmp)
        } catch(err) {
            console.log(err)
        }
    }
    const sortBabyboxes = (a: Babybox, b: Babybox) => {
        if(a.favorite && !b.favorite) return -1
        if(!a.favorite && b.favorite) return 1
        if(a.name > b.name) return 1
        if(a.name < b.name) return -1
        return 0
    }
    if(error) return <span>Chyba</span>
    if(!babyboxes) return <span>Nacitam</span>
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
