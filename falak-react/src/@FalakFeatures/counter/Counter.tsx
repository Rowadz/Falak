import React, { useState } from 'react'
import { CounterFeatureProps } from '@FalakFeatures/counter/interfaces'
import { useSelector } from 'react-redux'
import { Box, Text, Center } from '@chakra-ui/react'
import { Counter as CounterUI } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'

const Counter = ({ text, eventType }: CounterFeatureProps) => {
  const [state, setState] = useState({ color: 'cornflowerblue' })
  const count: number = useSelector(selectCount(eventType))

  return (
    <Box bg={state.color} height="40vh" borderRadius="lg" boxShadow="2xl" >
      <Center height="40vh" color="white">
        <Text fontSize="1.5rem">
          <CounterUI
            end={count}
            onEnd={() => setState({ color: 'cornflowerblue' })}
            onStart={() => setState({ color: 'purple.400' })}
          />{' '}
          {text}
        </Text>
      </Center>
    </Box>
  )
}

export default Counter
