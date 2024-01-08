import { Box, Grid,HStack,Heading,Table,TableCaption,TableContainer, Th, Thead, Tr,Td,Button, Tbody, Image, useDisclosure } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Dashboard/Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { getAllCourses, getCourseLecture } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'





const AdminCourses = () => {


  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const { isOpen,onClose,onOpen } = useDisclosure();

  

  const {courses,lectures}=useSelector(state=>state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  
  const dispatch = useDispatch();
  
  const coureDetailsHandler = (courseId,title) => {
    dispatch(getCourseLecture(courseId));
    setCourseId(courseId);
    setCourseTitle(title);
    onOpen();

  
  };
  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
  console.log(courseId);
  console.log(lectureId);
  await dispatch(deleteLecture(courseId,lectureId));
  dispatch(getCourseLecture(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myform=new FormData();
    myform.append("title",title);
    myform.append("description",description);
   
    myform.append("file",video);
    await dispatch(addLecture(courseId,myform));
    dispatch(getCourseLecture(courseId));
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

    dispatch(getAllCourses());
  }, [dispatch, error, message, onClose]);



  return (

    
   <Grid
   css={{
    cursor:`url(${cursor}),default`,
   }}
   minH="100vh"
   templateColumns={["1fr","5fr 18rem"]}

   >
    <Box
    p={["0","8"]}
    overflowX={"auto"}
    >
    <Heading
    textTransform={"uppercase"}
    children="All Courses"
    my="16"
    textAlign={["center","left"]}
      />
    <TableContainer w={["98vh","full"]}>
      <Table variant="simple" size={"md"}>
      <TableCaption>All available courses in the database</TableCaption>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>Poster</Th>
          <Th>Title</Th>
          <Th>Category</Th>
          <Th>Creator</Th>
          <Th isNumeric>Views</Th>
          <Th isNumeric>Lectures</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Thead>

      <Tbody>
              {courses.map(item => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
        </Table> 

    </TableContainer>
    <CourseModal
    isOpen={isOpen}
    onClose={onClose}
    id={courseId}
    courseTitle={courseTitle}
    deleteButtonHandler={deleteLectureButtonHandler}
    addLectureHandler={addLectureHandler}
    loading={loading}
    lectures={lectures}
    

    />

        
    </Box>
  



    
    <Sidebar/>
   </Grid>
  )
}




export default AdminCourses



function Row ({item,coureDetailsHandler,deleteButtonHandler,loading}){
  return(
      <Tr>
          <Td>#{item._id}</Td>
          <Td>
            <Image src={item.poster.url} objectFit={"contain"}/>
          </Td>
          <Td>{item.title}</Td>
          <Td>{item.category}</Td>
          <Td>{item.createdBy}</Td>
          <Td>{item.views}</Td>
          <Td>{item.numOfVideos}</Td>
       <Td isNumeric>
      <HStack justifyContent={"flex-end"}>
          <Button 
          onClick={()=>coureDetailsHandler(item._id,item.title)}
          variant="outline"
          color="purple.500"
          isLoading={loading}

          >View Lectures</Button>
          <Button 
          onClick={()=>deleteButtonHandler(item._id)}
          color="purple.500"
          isLoading={loading}
          ><RiDeleteBin7Fill/></Button>


      </HStack>
       </Td>
      </Tr>
      
  )
}