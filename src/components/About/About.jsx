import { Container, Heading, Text, VStack ,Stack,Avatar,Button,Box, HStack, Center} from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';
import introvideo from '../../assets/videos/intro.webm';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsandconditions from "../../assets/docs/termsandcondition"


const TandC = ({termsandconditions})=>{
    return (
        <Box padding={"4"}>
            <Heading size="md" children="Terms and Conditions" textAlign={["center","left"]} my="4" / >
                <Box h="sm" p="4" overflow={"scroll"}>
                    <Text
                    fontFamily={"heading"}
                    letterSpacing={"widest"}
                    textAlign={["center","left"]}
                    >
                        {termsandconditions}
                        </Text>
                        <Heading my="4" children="Refund only applicable for cancellation wirhin 7 days" size="xs"/>

                </Box>
        </Box>
    )
}


const VideoPlayer =()=>(
    
    <Box boxShadow={"dark-lg"}>
        <video 
        autoPlay
        controls
        
        src={introvideo}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        >

        </video>
    </Box>
    )


const Founder = () => {
    return <Stack justifyContent="center" direction={["center","row"]} spacing={["4","16"]} padding={"8"}>
        <VStack>
            <Avatar src="https://netstorage-legit.akamaized.net/images/82d5e6672f4bc25d.jpg?imwidth=900" boxSize={["40","48"]}/>
            <Text children="Co-Founder" opacity={0.7}/>

        </VStack>
        <VStack justifyContent="center" alignItems={['center','flex-start']}>
            <Heading children="Priyansh Pandey" size={["md","xl"]} justifyContent={"center"}/>
            <Text textAlign="center" children={`Allow me to introduce myself, I am Priyansh Pandey, a dedicated student currently pursuing electrical engineering at MNIT, Jaipur. I find immense joy in exploring the intricacies of electrical systems, but my true passion lies in the realm of web development. With my full stack skills, I am able to bring together the technical aspects of engineering with the creative possibilities of coding, creating digital experiences that are both functional and visually captivating.`}/>

        </VStack>
    </Stack>
}

const About = () => {
  return (
  <Container maxW="container.lg" padding={"16"} boxShadow={"lg"}>
    <Heading children="About us" textAlign={["center,left"]}/>
    <Founder/>
    <Stack m="8" direction={["column","row"]} alignItems="center">
    <Text fontFamily={"cursive"} m="9" textAlign={["center","left"]}>
        We are a video streaming platform with some premium courses available for premium users.
    </Text>
    <Link to="/subscribe">
        <Button colorScheme='yellow' variant={"ghost"}>Checkout Our Plans!!</Button>
    </Link>

    </Stack>
    <Box display="flex" justifyContent={"center"} alignItems={"center"} >
    <VideoPlayer/>
    </Box>
    <TandC termsandconditions={termsandconditions}/>
    <HStack my="4" padding="4">
        <RiSecurePaymentFill/>
        <Heading children="Payment Secured by Razorpay" size="xs" fontFamily={"sans-serif"} />
    </HStack>
    
  </Container>
  )
}

export default About
