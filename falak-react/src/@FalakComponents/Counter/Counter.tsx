import React from 'react'
import CountUp, { CountUpProps } from 'react-countup'

const Counter = ({ end, onEnd, onStart }: CountUpProps) => {
  return (
    <CountUp
      start={end - 1}
      end={end}
      separator=","
      decimal=","
      duration={2.7}
      onStart={onStart}
      onEnd={onEnd}
    />
  )
}

export default Counter
