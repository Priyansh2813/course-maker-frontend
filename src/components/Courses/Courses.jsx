import { Button, Container, HStack, Heading, Image, Input,Stack,Text, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';



const Course =({views,title,imageSrc,id,addToPlaylistHandler,creator,description,lectureCount,loading})=>{

  
    return (
        <VStack className='course' alignItems={["center","flex-start"]}>
            <Image src={imageSrc} boxSize={"60"} objectFit={"contain"}/>
            <Heading textAlign={["center","left"]}  maxW="200px" fontFamily={"sans-serif"}
            noOfLines={3}
            children={title}
            size={"sm"}
            />
            <Text noOfLines={2} children={description}/> 

            <HStack>
            <Text fontWeight={"bold"} children={"CREATOR"} textTransform="uppercase"/>
            <Text fontFamily={"body"} children={creator} />
            
            </HStack>
            <Heading textAlign={"center"} size={"xs"} children={`Lectures - ${lectureCount}`}/>
            <Heading textAlign={"center"} size={"xs"} children={`Views - ${views}`}/>
            <Stack direction={["center","row"]} alignItems={"center"}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme='yellow'>Explore Now</Button>
                </Link>
                <Button colorScheme='yellow' variant={"ghost"} onClick={()=>addToPlaylistHandler(id)
                }
                isLoading={loading}
                >Add To Playlist</Button>

            </Stack>
        </VStack>
    )
}

const Courses = () => {

    const [keyword,setKeyword]= useState("");
    const [category, setcategory] =useState("");

    const dispatch =useDispatch();
    const {loading,courses,error,message} = useSelector(state=>state.course);

    const addToPlaylistHandler=async(courseId)=>{
        await dispatch(addToPlaylist(courseId));
        //we need to dispatch the loadUser so that the changes appear in profile without refreshing the page.
    
        dispatch(loadUser());
    }
    

    useEffect(()=>{
        dispatch(getAllCourses(category,keyword));
        if(error){
            toast.error(error);
            dispatch({type:"clearError"});
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"});
        }
    },[category,keyword,dispatch,error,message]);

    const categories=[
        "Web-development","Stock-Market","Artificial Intelligence","Machine Learning","Deep Learning" ,"Data Science","Data Anayst"
    ]
  return (
   <Container minH={'95vh'} maxW={"container.lg"} paddingY={'8'}>

    <Heading children="ALL COURSES" m={"8"}/>

    <Input value={keyword} onChange={e=>setKeyword(e.target.value)}
    placeholder='Search a course'
    focusBorderColor='yellow.500'
    />

    <HStack overflowX={"auto"} paddingY={"8"} css={{"&::-webkit-scrollbar":{display:'none'}}}>
        
       {categories.map((item,index)=>(
        <Button minW="60" key={index} onClick={()=>setcategory(item)}>
            <Text children={item}/>

        </Button>
  ))}
    </HStack>
    
    <Stack
    direction={["column","row"]}
    flexWrap={"wrap"}
    justifyContent={["flex-start","space-evenly"]}
    alignItems={["center","flex-start"]}
    >
       {
        courses.length > 0 ? (
            courses.map(item=>(
                <Course
                key={item._id}
                title={item.title}
                description={item.description}
                creator={item.createdBy}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
                />
            ))
        ):(
            <Heading children="Courses Not Found" />
        )
       }

    </Stack>

   </Container>
  )
}

export default Courses
