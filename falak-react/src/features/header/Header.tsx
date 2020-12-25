import React from 'react'
import { Heading, Flex } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          🌑 Falak 🌑
        </Heading>
      </Flex>
    </Flex>
  )
}

export default Header
