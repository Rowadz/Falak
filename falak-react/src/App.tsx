import React from 'react'
import { Box } from '@chakra-ui/react'
import { Dashboard } from '@FalakFeatures'
import { Header } from '@FalakComponents'

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
