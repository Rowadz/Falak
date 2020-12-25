import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'socket.io-client'
import { SimpleGrid, Box, Center } from '@chakra-ui/react'
import CreateQueriesKPI from '../createQueriesKPI/CreateQueriesKPI'
import DeleteQueriesKPI from '../deleteQueriesKPI/DeleteQueriesKPI'
import UpdateQueriesKPI from '../updateQueriesKPI/UpdateQueriesKPI'
import { addEvent } from './slice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const height = useMemo(() => '20vh', [])
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
        <Box bg="cornflowerblue" height={height} borderRadius="lg" boxShadow="2xl">
          <Center height={height} color="white">
            <CreateQueriesKPI />
          </Center>
        </Box>
        <Box bg="cornflowerblue" height={height} borderRadius="lg" boxShadow="2xl">
          <Center height={height} color="white">
            <DeleteQueriesKPI />
          </Center>
        </Box>
        <Box bg="cornflowerblue" height={height} borderRadius="lg" boxShadow="2xl">
          <Center height={height} color="white">
            <UpdateQueriesKPI />
          </Center>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard
