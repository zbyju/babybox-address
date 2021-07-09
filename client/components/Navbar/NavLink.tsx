import {Text, LinkBox, LinkOverlay, Center} from "@chakra-ui/react";
import Link from 'next/link'

interface NavLinkProps {
    label: string,
    link: string,
    borderLeft?: boolean
    active?: boolean
}

export default function NavLink(link: NavLinkProps) {
    const borderWidth = "1px"
    return (
        <LinkBox borderRight={borderWidth}
                 borderLeft={link.borderLeft ? borderWidth : "0px"}
                 borderColor="gray.200"
                 bg={link.active ? "yellow.50" : "white"}
                 transition="0.5s all"
                 h="100%"
                 px={2}
                 _hover={{
                     bg: "yellow.100",
                     color: "black",
                 }}>
            <Center w="100%" h="100%" p={[2, 3]}>
                <Link href={link.link} passHref>
                    <LinkOverlay>
                        <Text fontSize="lg" ms={0}>{link.label}</Text>
                    </LinkOverlay>
                </Link>
            </Center>
        </LinkBox>
    )
}