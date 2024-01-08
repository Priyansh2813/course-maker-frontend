import React from 'react';
import ColorModeSwitcher from "../../../ColorModeSwitcher";
import { Button,Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from "react-icons/ri"
import { Link } from 'react-router-dom';
import { logout } from '../../../redux/actions/user';
import { useDispatch } from 'react-redux';




const LinkButton = ({url="/",title="Home",onClose})=>(
  <Link to={url} onClick={onClose}>
  <Button variant={"ghost"}>{title}</Button>
   </Link>
);



const Header=({isAuthenticated=false,user})=>{

  const {isOpen,onOpen,onClose} = useDisclosure();

  
  const dispatch=useDispatch();
  const logouthandler=()=>{
    
    onClose();
    dispatch(logout());
  };


  return (<>

    <ColorModeSwitcher/>

    <Button onClick={onOpen} colorScheme="yellow" width="12" zIndex={"overlay"} height={"12"} rounded={"full"} position="fixed" top="6" left="6">
    <RiMenu5Fill/>
    </Button>
    <Drawer placement="left" isOpen={isOpen} onClose={onClose} >
      <DrawerOverlay backdropFilter={"blur(5px)"}/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth={"1px"}>
          Course Maker
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={"4"} alignItems={"flex-start"}>
         <LinkButton onClose={onClose} url="/" title="Home"/>
         <LinkButton onClose={onClose} url="/courses" title="Browse All Courses" />
         <LinkButton  onClose={onClose} url="/request" title="Request a Course"/>
         <LinkButton  onClose={onClose} url="/contact" title="Contact"/>
         <LinkButton onClose={onClose} url="/about" title="About"/>
          <HStack justifyContent={"space-evenly"} postion="fixed" bottom={'2rem'} width="80%">

          {isAuthenticated ? <>
          <VStack>
            <HStack>
            <Link to="/profile" onClick={onClose}>
            <Button variant="ghost" colorScheme={"yellow"}>Profile</Button>
          </Link>

          <Button variant="ghost" onClick={logouthandler}  ><RiLogoutBoxLine/>Logout</Button>
            </HStack>


            {
              user && user.role==="admin" && (<Link onClick={onClose} to="/admin/dashboard">
                <Button colorScheme='purple' variant={"ghost"}><RiDashboardFill style={{margin:"4px"}}/>DashBoard</Button>
              </Link>
              )}
          </VStack>

          
          </> : <>
          <Link onClick={onClose} to="/login">
            <Button colorScheme={"yellow"}>Login</Button>
          </Link>

          <p>OR</p>
          <Link onClick={onClose} to="/register">
            <Button colorScheme={"yellow"}>Sign Up</Button>
          </Link>
          </>}

          </HStack>

          </VStack>

        </DrawerBody>
      </DrawerContent>
     
    </Drawer>
    
  
  </>);
}

export default Header;
