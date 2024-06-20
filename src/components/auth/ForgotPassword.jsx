import { Button, Container, Heading, Input,VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email,setEmail] =useState("");
    const { loading, message, error } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const submitHandler = e => {
      e.preventDefault();
      dispatch(forgotPassword(email));
    };
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, message]);

  return (
    <Container height={"90vh"} py={"16"}>
       <form onSubmit={submitHandler}>
        <Heading
        children="Forgot Password"
        my="16"
        textTransform={'uppercase'}
        textAlign={["center","left"]}

        />
        <VStack>
        <Input
        required
        value={email}
        onChange={e=>setEmail(e.target.value)}
        placeholder="abc@gmail.com"
        type="email"
        focusBorderColor="yellow.500"
        />
        <Button type="submit" w="full" isLoading={loading} colorScheme="yellow">
        Send Reset Link
        </Button>
</VStack>
       </form>
    </Container>
  )
}

export default ForgotPassword
