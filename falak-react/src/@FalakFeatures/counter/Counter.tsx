import React, { useState } from 'react'
import { CounterFeatureProps } from '@FalakFeatures/counter/interfaces'
import { useSelector } from 'react-redux'
import { Box, Text, Center } from '@chakra-ui/react'
import { Counter as CounterUI } from '@FalakComponents'
import { selectCount } from '@FalakFeatures/genericSelectors'
import colors from '@FalakFeatures/colors'

const Counter = ({ eventType, children }: CounterFeatureProps) => {
  const [state, setState] = useState({ color: '#2F3540' })
  const count: number = useSelector(selectCount(eventType))

  return (
    <Box bg={state.color} height="40vh" borderRadius="lg" boxShadow="2xl">
      <Center height="40vh" color={colors.white}>
        <Text fontSize="1.5rem">
          <CounterUI
            end={count}
            onEnd={() => setState({ color: '#2F3540' })}
            onStart={() => setState({ color: '#141A26' })}
          />{' '}
          {children}
        </Text>
      </Center>
    </Box>
  )
}

export default Counter
