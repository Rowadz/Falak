import React from 'react'
import { Button } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import { connect } from 'socket.io-client'
// TODO:: make this link dynamic and reads the port from the backend 
const socket = connect('http://localhost:3030', { transports: ['websocket'] })

socket.on('events', (data: unknown) => {
  console.log('event', data) // TODO:: add data to redux from here (in some way)
})

const App = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Button colorScheme="blue" onClick={toggleColorMode}>
      Button
    </Button>
  )
}

export default App
