import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'
import { Counter } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'

const UpdateQueriesKPI = () => {
  const updatedCount: number = useSelector(selectCount('UPDATE'))
  return (
    <Box>
      <Text fontSize="2rem">
        <Counter end={updatedCount} /> of Update Queries
      </Text>
    </Box>
  )
}

export default UpdateQueriesKPI
