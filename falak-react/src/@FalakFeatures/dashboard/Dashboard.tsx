import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'socket.io-client'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { Counter, PieChart, TimelineChart } from '@FalakFeatures'
import { addEvent } from './slice'

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const socket = connect('http://localhost:3030', {
      transports: ['websocket'],
    })

    socket.on('event', (data: unknown) => {
      dispatch(addEvent(data))
    })
  }, [dispatch])

  return (
    <Box>
      <SimpleGrid columns={3} spacing="40px" mt="1">
        <Counter eventType="INSERT" text="of insert queries" />
        <Counter eventType="DELETE" text="of delete queries" />
        <Counter eventType="UPDATE" text="of update queries" />
      </SimpleGrid>
      <SimpleGrid columns={2} spacing="40px" mt="6">
        <Box
          bg="cornflowerblue"
          height="60vh"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <PieChart />
        </Box>
        <Box
          bg="cornflowerblue"
          height="60vh"
          borderRadius="lg"
          boxShadow="2xl"
        >
          <TimelineChart />
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
