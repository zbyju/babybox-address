import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Nav from '../components/Navbar/Nav'
import PageLayout from '../components/PageLayout'
import axios from 'axios'
import { SWRConfig } from 'swr'

axios.defaults.baseURL = 'http://localhost:3010/api';

function App(props: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => axios(url).then(r => r.data) }}>
      <ChakraProvider resetCSS={true}>
        <Nav />
        <PageLayout props={props} />
      </ChakraProvider>
    </SWRConfig >
  )
}
export default App
