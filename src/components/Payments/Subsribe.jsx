import { Heading, VStack,Box,Text,Container,Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Subsribe = ({user}) => {

  const dispatch=useDispatch();
  const [key,setKey]=useState();

  const {loading,error,subscriptionId}=useSelector(state=>state.subscription);
  const {error:courseError}=useSelector(state=>state.course);

  const subscribeHandler=async()=>{
   
    const {data}= await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription());
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(courseError){
      toast.error(courseError);
      dispatch({type:"clearError"});
    }
    if(subscriptionId){
      const openPopUp =()=>{
        const options={
          key,
          name:"Course-Maker",
          description:"Get access to all exclusive content",
          image:"https://www.spectrumnetdesigns.com/wp-content/uploads/2019/03/photo_40623_20150910.jpg",
          subscription_id:subscriptionId,
          callback_url:`${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""
          },
          notes:{
            address:"Priyansh Pandey Gorakhpur"
          },
          theme:{
            color:"#FFC800"
          }
        };
        const razor= new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  },[dispatch,error,courseError,user.name,user.email,key,subscriptionId]);

  return (
    <Container h="90vh" p="16">
        <Heading children="Welcome" my="8"  alignItems={"center"} / >
            <VStack boxShadow={"lg"} alignItems={"stretch"} borderRadius="lg" spacing="0">
                <Box bg="yellow.400" p="4" css={{borderRadius:"8px 8px 0 0"}}>
                    <Text children={`Pro Pack - ₹299.00`}  color="black" />
                </Box>
            </VStack>
           <Box p="4">
            <VStack textAlign={"center"} px="8" mt="4" spacing={"8"}>
                <Text  children={`Join Pro Pack and Get Access to all content.`}/>
                <Heading size="md" children="₹299 ONLY"/>

            </VStack>
            <Button my="8" w="full" colorScheme='yellow' isLoading={loading} onClick={subscribeHandler}>Buy Now</Button>
           </Box>
           <Box bg="blackAlpha.600" p="4" css={{borderRadius:"0 0 8px 8px"}}>
           <Heading size="sm" textTransform="uppercase" color=" white" children="100% Refund on Cancellation"/>
           <Text children="*Terms & Conditions Apply" fontSize={"xs"} color="white"/>
           </Box>


    </Container>
  )
}

export default Subsribe
