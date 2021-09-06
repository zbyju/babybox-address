import {
    Flex,
    Heading,
    Button,
    List, ListItem, Link, ListIcon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Link {
    label: string,
    link: string
}

interface ListFastLinksProps {
    linksProp: Array<Link>
}

export default function ListFastLinks({ linksProp }: ListFastLinksProps) {
    return (
        <>
            <Flex alignItems="center" mb={2}>
                <Heading mr={3}>Rychlé odkazy</Heading>
            </Flex>
            <List ml={1}>
                {linksProp.map((link, index) => {
                    return (
                        <ListItem key={index}>
                            <ListIcon as={ExternalLinkIcon} color="blue.600" mb="2px" />
                            <Link fontSize="1.2em" href={link.link} isExternal>
                                {link.label}
                            </Link>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
