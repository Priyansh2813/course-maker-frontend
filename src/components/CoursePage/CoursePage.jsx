import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLecture } from '../../redux/actions/course';
const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();
  const { lectures } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getCourseLecture(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return (
    <Grid minH="80vh" templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width="100%"
              controls
              src={lectures[lectureNumber].video.url}
              controlsList="nodownload  noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
            ></video>
            <Heading
              m="4"
              children={`#${lectureNumber} ${lectures[lectureNumber].title}`}
            />
            <Heading m="4" children="Description" size="md" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>
          <VStack>
            {lectures.map((element, index) => (
              <button
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
                onClick={() => setLectureNumber(index)}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading>There are no lectures for this course</Heading>
      )}
    </Grid>
  );
};

export default CoursePage;
