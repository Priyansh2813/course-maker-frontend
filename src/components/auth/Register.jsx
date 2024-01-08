import React , { useState }from 'react';
import { Container, FormLabel, Input, VStack ,Heading, Box,Button, Avatar} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';

export const fileUploadCss ={
    cursor:"pointer",
        marginLeft:"-5%",
        border:"none",
        width:"110%",
        height:"100%",
        color:"#ECC94B",
        backgroundColor:"white",

}
const fileUploadStyle = {
    "&::file-selector-button":fileUploadCss
}


const Register = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const[Imageprev,setImageprev]=useState("");
    const [image,setImage]=useState("");
    const dispatch =useDispatch();

    const changeImageHandler = (e)=>{
        const file=e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setImageprev(reader.result);
            setImage(file);

        };

    };

    
    const submitHandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();
        myform.append("name",name);
        myform.append("email",email);
        myform.append("password",password);
        myform.append("file",image);
        dispatch(register(myform));
    }
  return (
    <Container h={"110vh"}>

    <VStack h={'full'} justifyContent={"center"} spacing={'16'}>
        <Heading children="REGISTRATION" marginTop="10"/>
        <form onSubmit={submitHandler} style={{width:"100%"}}>
        <Box my="4" display={'flex'} justifyContent={"center"}>
            <Avatar src={Imageprev} size="2xl" />

        </Box>
        <Box marginY={"4"}>
       <FormLabel htmlFor='email' children="Name"/>
        <Input
        required
        id="name"
        value={name}
        onChange={e=>setName(e.target.value)}
        placeholder="abc"
        type={"text"}
        focusBorderColor="yellow.500"
        />
       </Box>
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
        placeholder="Set Password"
        type={"Password"}
        focusBorderColor="yellow.500"
        />
       </Box>
       <Box marginY={"4"}>
       <FormLabel htmlFor='chooseAvatar' children="Choose Avatar"/>
        <Input
        accept='image/*'
        required
        id="chooseAvatar"
        
        type={"file"}
        focusBorderColor="yellow.500"
        css={fileUploadStyle}
        onChange={changeImageHandler}
        />
       </Box>
        
        <Button my="4" colorScheme='yellow' type="submit">
            Sign Up

        </Button>

        <Box my="4" >
            Already Registered? <Link to="/login"><Button variant="link" colorScheme='yellow'>Login</Button>{" "} here!</Link>

        </Box>

    </form>
    </VStack>
    
</Container>
  )
}

export default Register
