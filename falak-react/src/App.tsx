import React from 'react'
import { Box } from '@chakra-ui/react'
import { Header, Dashboard } from './@FalakFeatures'

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
