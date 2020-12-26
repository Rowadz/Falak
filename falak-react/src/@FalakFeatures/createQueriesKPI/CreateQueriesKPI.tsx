import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'
import { Counter } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'

const CreateQueriesKPI = () => {
  const createCount: number = useSelector(selectCount('INSERT'))
  return (
    <Box>
      <Text fontSize="2rem">
        <Counter end={createCount} 
        
        /> of Create Queries
      </Text>
    </Box>
  )
}

export default CreateQueriesKPI
