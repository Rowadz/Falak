import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'
import { Counter } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'

const DeleteQueriesKPI = () => {
  const deleteCount: number = useSelector(selectCount('DELETE'))
  return (
    <Box>
      <Text fontSize="2rem">
        <Counter end={deleteCount} /> of Delete Queries
      </Text>
    </Box>
  )
}

export default DeleteQueriesKPI
