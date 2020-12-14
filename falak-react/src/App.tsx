import React from 'react'

import { Button } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'

const App = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Button colorScheme="blue" onClick={toggleColorMode}>
      Button
    </Button>
  )
}

export default App
