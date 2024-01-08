import { Box,Stack, VStack,Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialLinkedin,TiSocialInstagram,TiSocialGithub} from 'react-icons/ti'
const Footer = () => {
  return <Box padding="4" bg={"blackAlpha.900"}
  minH="10vh"
  >
    <Stack direction={["column","row"]}>
        <VStack alignItems={["center","flex-start"]} width={"full"}>
            <Heading size="lg" children="ALL RIGHTS RESERVED" color="white"/>
            <Heading size="sm" fontFamily="body" children={"@Priyansh Pandey"} color="yellow.400"/ >

        </VStack>
        <HStack spacing={["2","10"]} justifyContent={"center"}  color="yellow.400" fontSize={"50"}> 
        <a href="https://www.linkedin.com/in/priyansh-pandey-a46760211/" target='_blank'> <TiSocialLinkedin /> </a>
       <a href="https://www.instagram.com/priyansh__pandey/" target='_blank'><TiSocialInstagram/>
       </a>
      <a><TiSocialGithub /></a>
        
        </HStack>

    </Stack>

  </Box>
}

export default Footer
