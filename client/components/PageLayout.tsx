import {AppProps} from "next/app";
import {Box, Container, Flex} from "@chakra-ui/react";

interface PageLayoutProps {
    props: AppProps
}


export default function PageLayout({ props } : PageLayoutProps) {
    const { Component, pageProps } = props
    return (
        <Flex justify="center">
            <Box w="66%" mt={5}>
                <Component {...pageProps} />
            </Box>
        </Flex>
    )
}