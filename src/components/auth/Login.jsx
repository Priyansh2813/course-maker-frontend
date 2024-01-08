import { Container, FormLabel, Input, VStack ,Heading, Box,Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch =useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    };


  return (
    
    <Container h={"95vh"}>

        <VStack h={'full'} justifyContent={"center"} spacing={'16'}>
            <Heading children="Welcome to Course-Maker"/>
            <form onSubmit={submitHandler} style={{width:"100%"}}>
           <Box marginY={"4"}>
           <FormLabel htmlFor='email' children="Email Address"/>
            <Input
            required
            id="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type={"email"}
            focusBorderColor="yellow.500"
            />
           </Box>

           <Box marginY={"4"}>
           <FormLabel htmlFor='password' children="Password"/>
            <Input
            required
            id="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Enter your password"
            type={"Password"}
            focusBorderColor="yellow.500"
            />
           </Box>
            <Box>
                <Link to={"/forgotpassword"} >
                    <Button fontSize="sm" variant="link">Forgot Password?</Button>
                </Link>
            </Box>
            <Button my="4" colorScheme='yellow' type="submit">
                Login

            </Button>

            <Box my="4">
                New User? <Link to="/register"><Button variant="link" colorScheme='yellow'>Sign Up</Button>{" "} here!</Link>

            </Box>

        </form>
        </VStack>
        
    </Container>
  )
}

export default Login
