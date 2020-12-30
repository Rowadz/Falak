import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  useColorMode,
  Heading,
  Flex,
  Box,
  Button,
  Progress,
  useToast,
} from '@chakra-ui/react'
import { selectConnectionStatus } from '@FalakFeatures/header/selectors'

const Header = () => {
  const { toggleColorMode } = useColorMode()
  const toast = useToast()
  const connectionStatus = useSelector(selectConnectionStatus)
  useEffect(() => {
    if (!connectionStatus) {
      toast({
        title: 'Lost connection',
        description: 'check the api plz..',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [connectionStatus])

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg={connectionStatus ? 'cornflowerblue' : 'tomato'}
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
            🌑 Falak 🌑
          </Heading>
        </Flex>
        <Box display={{ sm: 'block', md: 'block' }} mt={{ base: 4, md: 0 }}>
          <Button
            onClick={toggleColorMode}
            colorScheme="cornflowerblue"
            borderRadius="lg"
          >
            Toggle Theme
          </Button>
        </Box>
      </Flex>
      {!connectionStatus && (
        <Progress size="lg" isIndeterminate colorScheme="gray" />
      )}
    </>
  )
}

export default Header
