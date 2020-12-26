import React from 'react'
import { useColorMode, Heading, Flex, Box, Button } from '@chakra-ui/react'

const Header = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="cornflowerblue"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          🌑 Falak 🌑
        </Heading>
      </Flex>
      <Box display={{ sm: 'block', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <Button onClick={toggleColorMode} colorScheme="cornflowerblue" borderRadius="lg">
          Toggle Theme
        </Button>
      </Box>
    </Flex>
  )
}

export default Header
