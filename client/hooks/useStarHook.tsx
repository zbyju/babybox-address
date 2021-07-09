import {Babybox} from "../types/babybox";
import {StarIcon} from "@chakra-ui/icons";

// @ts-ignore
export default function useStarHook(babybox: Babybox, toggleStar) {
    if(babybox.favorite) {
        return (
            <StarIcon w={6} h={6} cursor="pointer"
                      color="blue.600"
                      onClick={ () => toggleStar(babybox) }
            />
        )
    } else {
        return (
            <StarIcon w={6} h={6} cursor="pointer"
                      color="black"
                      onClick={ () => toggleStar(babybox) }
            />
        )
    }
}