import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Nav from '../components/Navbar/Nav'
import PageLayout from '../components/PageLayout'

function App(props: AppProps) {
  return (
      <ChakraProvider resetCSS={true}>
          <Nav />
          <PageLayout props={props} />
      </ChakraProvider>
  )
}
export default App
