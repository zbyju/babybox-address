import {Container, Divider, Flex, Text, Heading, LinkBox, LinkOverlay, HStack} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Footer() {
    return (
        <>
            <Flex boxShadow="md" justify="center" bg="gray.700" py="5" color="white" mt="10">
                <Flex w="66%" direction="column" align="center" justify="space-between">
                    <Text>Vytvořil Zbyněk Juřica, 2021</Text>
                    <Text>Oficiální repozitář projektu: 
                        <Link href="https://github.com/zbyju/babybox-address" mx="3px" fontWeight="700" isExternal>
                            GitHub
                            <ExternalLinkIcon mx="2px" mb="5px" />
                        </Link>
                    </Text>
                    <Text>Pro nahlášení jakýchkoliv chyb vyplňte formulář: 
                        <Link href="https://gitreports.com/issue/zbyju/babybox-address" mx="3px" fontWeight="700" isExternal>
                            Odkaz na formulář
                            <ExternalLinkIcon mx="2px" mb="5px" />
                        </Link>
                    </Text>
                </Flex>
            </Flex>
            <Divider />
        </>
    )
}