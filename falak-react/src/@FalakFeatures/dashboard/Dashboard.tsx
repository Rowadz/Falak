import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'socket.io-client'
import {
  SimpleGrid,
  Box,
  Center,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { Counter, PieChart } from '@FalakFeatures'
import { addEvent, changeConnectionStatus } from './slice'
import { selectConnectionStatus } from './selectors'

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

  const connectionStatus = useSelector(selectConnectionStatus)

  return (
    <Box>
      <SimpleGrid columns={3} spacing="40px" mt="1">
        <Counter eventType="INSERT" text="insert queries 🆕" />
        <Counter eventType="DELETE" text="delete queries 🗑️" />
        <Counter eventType="UPDATE" text="update queries ♻️" />
      </SimpleGrid>
      <SimpleGrid columns={3} spacing="40px" mt="6">
        <Box
          bg="cornflowerblue"
          height="40vh"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <PieChart />
        </Box>
        <Counter eventType="ALL" text="total queries" />
        <Box
          bg={connectionStatus ? 'cornflowerblue' : 'tomato'}
          height="40vh"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <Center height="40vh" color="white">
            {connectionStatus ? (
              <Text fontSize="2rem">Connected</Text>
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </Center>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
