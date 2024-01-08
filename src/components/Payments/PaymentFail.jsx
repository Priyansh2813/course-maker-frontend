import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return (
    <Container h="90vh" p="16">
        <VStack justifyContent={"center"} alignItems={"center"} spacing="4" h="full">
        <RiErrorWarningFill size="5rem"/>
    <Heading my="8" textAlign="center">
        
        Payment Failed
    </Heading>
  
<Link to="/subscribe">
    <Button variant="ghost">
        Try again
    </Button>
</Link>
</VStack>
   </Container>
  )
}



export default PaymentFail
