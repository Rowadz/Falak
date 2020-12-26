import React, { useState } from 'react'
import { CounterFeatureProps } from '@FalakFeatures/counter/interfaces'
import { useSelector } from 'react-redux'
import { Box, Text, Center } from '@chakra-ui/react'
import { Counter as CounterUI } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'

const Counter = ({ text, eventType }: CounterFeatureProps) => {
  const [state, setState] = useState({ color: 'cornflowerblue' })
  const count: number = useSelector(selectCount(eventType))
  const a: number = useSelector(
    (state) => (state as any).dashboard.events.length
  )
  console.log({ a })
  return (
    <Box bg={state.color} height="20vh" borderRadius="lg" boxShadow="2xl">
      <Center height="20vh" color="white">
        <Text fontSize="2rem">
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
