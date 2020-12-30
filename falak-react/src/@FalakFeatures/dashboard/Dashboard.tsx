import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'socket.io-client'
import { SimpleGrid, Box, useToast, Text } from '@chakra-ui/react'
import { Counter, PieChart, BarChart } from '@FalakFeatures'
import {
  FcFullTrash,
  FcPlus,
  FcSynchronize,
  FcAcceptDatabase,
} from 'react-icons/fc'
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
        <Counter eventType="INSERT">
          <>
            inserts <FcPlus style={{ display: 'inline' }} />
          </>
        </Counter>
        <Counter eventType="DELETE">
          <>
            delete <FcFullTrash style={{ display: 'inline' }} />
          </>
        </Counter>
        <Counter eventType="UPDATE">
          <>
            updates <FcSynchronize style={{ display: 'inline' }} />
          </>
        </Counter>
        <Counter eventType="ALL">
          <>
            total queries <FcAcceptDatabase style={{ display: 'inline' }} />{' '}
          </>
        </Counter>
      </SimpleGrid>
      <SimpleGrid columns={2} spacing="40px" mt="6">
        <Box bg="#2F3540" height="40vh" borderRadius="lg" boxShadow="2xl">
          <PieChart />
        </Box>
        <Box bg="#2F3540" height="40vh" borderRadius="lg" boxShadow="2xl">
          <BarChart />
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
