import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'socket.io-client'
import { SimpleGrid, Box, useToast } from '@chakra-ui/react'
import { Counter, PieChart } from '@FalakFeatures'
import { addEvent, changeConnectionStatus } from './slice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const socket = connect('http://localhost:3030', {
      transports: ['websocket'],
    })
    socket.on('event', (data: unknown) => dispatch(addEvent(data)))
    socket.on('disconnect', () => dispatch(changeConnectionStatus(false)))
    socket.on('connect', () => {
      dispatch(changeConnectionStatus(true))
      toast({
        title: 'Connected to websocket.',
        description: 'subscribing to mysql events',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
  }, [dispatch])

  return (
    <Box>
      <SimpleGrid columns={4} spacing="40px" mt="1">
        <Counter eventType="INSERT" text="insert queries 🆕" />
        <Counter eventType="DELETE" text="delete queries 🗑️" />
        <Counter eventType="UPDATE" text="update queries ♻️" />
        <Counter eventType="ALL" text="total queries" />
      </SimpleGrid>
      <SimpleGrid columns={2} spacing="40px" mt="6">
        <Box
          bg="cornflowerblue"
          height="40vh"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <PieChart />
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
