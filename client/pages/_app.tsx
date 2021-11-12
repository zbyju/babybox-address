import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Nav from '../components/Navbar/Nav'
import Footer from '../components/Navbar/Footer'
import PageLayout from '../components/PageLayout'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { config } from '../config'

axios.defaults.baseURL = config.api.baseUrl || 'http://localhost:3010/api';

function App(props: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => axios(url).then(r => r.data) }}>
      <ChakraProvider resetCSS={true}>
        <Flex direction="column" minH="100vh">
          <Nav />
          <PageLayout props={props} />
        </Flex>
        <Footer />
      </ChakraProvider>
    </SWRConfig >
  )
}
export default App
