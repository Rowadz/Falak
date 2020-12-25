import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header, Dashboard } from './features'

const App = () => {
  return (
    <>
      <Header />
      <Box p="5">
        <Dashboard />
      </Box>
    </>
  )
}

export default App
