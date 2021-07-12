import {Heading, HStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getDefaultBabybox} from "../../utils/defaultFactory";
import {useState} from "react";
import BabyboxStats from "../../components/Babybox/Stats/BabyboxStats";

export default function BabyboxPage() {
    const router = useRouter();
    const { BabyboxPage: handle } = Array.isArray(router.query) ? router.query[0] : router.query
    const [babybox, setBabybox] = useState(getDefaultBabybox())
    return (
        <>
            <Heading>Babybox {babybox.name ? babybox.name : handle}</Heading>
            <BabyboxStats babyboxHandle={handle} />
        </>
    )
}
