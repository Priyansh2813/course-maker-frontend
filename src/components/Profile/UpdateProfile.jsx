import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = () => {

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {loading}=useSelector(state=>state.profile);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const submitHandler=async(e)=>{
        e.preventDefault();
     await dispatch(updateProfile(name, email));
    await dispatch(loadUser());
    navigate('/profile');
      
    }
   
  return (
    <Container py="16" minH="90vh">

    <form onSubmit={submitHandler}>
        <Heading
        textTransform={"uppercase"}
        children="Update Profile"
        my="16"
        textAlign={["center","left"]}

        />
        <VStack spacing="8">
            <Input
            required
            value={name}
            placeholder='Name'
            onChange={e=>setName(e.target.value)}
            type={"text"}
            focusBorderColor='yellow.500'
            /> 
            <Input
            required
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder='Email'
            type={"email"}
            focusBorderColor='yellow.500'
            />
            <Button
            w="full"
            isLoading={loading}
            colorScheme='yellow'
            type="submit"
           
            >
                Update Profile
            </Button>

        </VStack>

    </form>
    </Container>
  )
}

export default UpdateProfile;
