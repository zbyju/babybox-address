import {Box, Flex, HStack, Stack, Wrap, WrapItem} from "@chakra-ui/react";
import BabyboxCard from "./BabyboxCard"
import {Babybox} from "../../types/babybox";
import {useState} from "react";

interface BabyboxesListProps {
    babyboxesProp: Array<Babybox>
}

export default function AllBabyboxesCardList({ babyboxesProp }: BabyboxesListProps) {
    const [babyboxes, setBabyboxes] = useState(babyboxesProp);
    const toggleFavoriteStar = (babybox: Babybox) => {
        let tmp = [...babyboxes]
        let index = tmp.findIndex(x => x.handle === babybox.handle)
        tmp[index].favorite = !tmp[index].favorite
        setBabyboxes([...tmp])
    }
    const sortBabyboxes = (a: Babybox, b: Babybox) => {
        if(a.favorite && !b.favorite) return -1
        if(!a.favorite && b.favorite) return 1
        if(a.name > b.name) return 1
        if(a.name < b.name) return -1
        return 0
    }
    return (
        <HStack spacing="0px" wrap="wrap" shouldWrapChildren>
            {babyboxes.sort(sortBabyboxes).map(babybox => {
                return (
                    <BabyboxCard babybox={babybox} key={babybox.handle}
                                 starPressed={toggleFavoriteStar} />
                )
            })}
        </HStack>
    )
}