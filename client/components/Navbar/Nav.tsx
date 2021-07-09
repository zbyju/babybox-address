import {Container, Divider, Flex, Heading, LinkBox, LinkOverlay, HStack} from "@chakra-ui/react";
import Link from 'next/link'
import NavLink from "./NavLink";

export default function Nav() {
    const links = [{
        label: "Domů",
        link: "/"
    },{
        label: "Nápověda",
        link: "/help"
    }]

    return (
        <>
            <Flex boxShadow="sm" justify="center">
                <Flex w="66%" justify="space-between">
                    <LinkBox>
                        <Link href="/" passHref>
                            <LinkOverlay>
                                <Heading size="2xl" mt={1} mb={3} alignSelf="center">BB-Adresy</Heading>
                            </LinkOverlay>
                        </Link>
                    </LinkBox>
                    <Flex>
                        {links.map((link, index) => {
                            return <HStack direction="row" key={link.label} spacing={0}>
                                <NavLink link={link.link} label={link.label} borderLeft={index == 0} />
                            </HStack>
                        })}
                    </Flex>
                </Flex>
            </Flex>
            <Divider />
        </>
    )
}