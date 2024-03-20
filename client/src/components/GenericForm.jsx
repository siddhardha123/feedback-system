import { useEffect, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  Button,
  HStack,
  VStack,
  Text
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import contractABI from './contractABI.json';


function GenericForm() {
  const { subject } = useParams();
  const [faculty, setFaculty] = useState('');
  const [overallRating, setOverallRating] = useState('5');
  const [contentQuality, setContentQuality] = useState('5');
  const [instructorKnowledge, setInstructorKnowledge] = useState('5');
  const [courseMaterials, setCourseMaterials] = useState('5');
  const [learningEnvironment, setLearningEnvironment] = useState('5');
  const [overallSatisfaction, setOverallSatisfaction] = useState('5');
  const [suggestions, setSuggestions] = useState('');
  const [recommend, setRecommend] = useState('no');
  const { address } = useAccount();
  const navigate = useNavigate()

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI, '0xC75e6c1A7995B24a69ab1ddA7e92a50cB6374561');

  // useEffect(() => {

  //   contract.methods.addFeedback("1","2","3").send({ from: '0xA9829ec29e85431364FC2B6e41b66A34f81AB69e' }).then(value => console.log(value))
  // }, [])


  const sendReqToBlockchain = (address,faculty,subject) => {
    contract.methods.addFeedback(address,faculty,subject).send({ from: '0xA9829ec29e85431364FC2B6e41b66A34f81AB69e' }).then(value => console.log(value))
  }

  const getDataFromBlockchain = () => {
    contract.methods.getAllFeedbacks().call().then(value => console.log(value))
  }

  useEffect(()=>{
    getDataFromBlockchain()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendReqToBlockchain(address,faculty,subject)
    // await getDataFromBlockchain()
    const formData = {
      address,
      faculty,
      subject,
      metadata: {
        overallRating,
        contentQuality,
        instructorKnowledge,
        courseMaterials,
        learningEnvironment,
        overallSatisfaction,
        suggestions,
        recommend,
      }

    };

    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Form submitted successfully!');
      navigate('/dashboard')
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error.message);
      toast.error('There was a problem submitting the form. Please try again later.');
    }
  };

  // Utility function to generate rating options
  const renderRatingOptions = (setValue) => (
    Array.from({ length: 10 }, (_, i) => (
      <Radio value={`${i + 1}`} key={i + 1} onChange={(e) => setValue(e.target.value)}>
        {i + 1}
      </Radio>
    ))
  );

  return (
    address ?
      <Flex p={4} justifyContent={'center'} alignItems={'center'} mx='auto'>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">

            <FormControl isRequired>
              <FormLabel>Course Name</FormLabel>
              <Input value={subject} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Handling Faculty</FormLabel>
              <Select placeholder="Select faculty" onChange={(e) => setFaculty(e.target.value)}>
                <option value="faculty1">Faculty 1</option>
                <option value="faculty2">Faculty 2</option>
                {/* Add more faculty options here */}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Overall Rating of the Course</FormLabel>
              <RadioGroup value={overallRating}>
                <HStack spacing={2}>
                  {renderRatingOptions(setOverallRating)}
                </HStack>
              </RadioGroup>
            </FormControl>

            {/* Additional rating fields with dynamic state updates */}
            <FormControl isRequired>
              <FormLabel>Content Quality</FormLabel>
              <RadioGroup value={contentQuality}>
                <HStack spacing={2}>
                  {renderRatingOptions(setContentQuality)}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Instructor Knowledge</FormLabel>
              <RadioGroup value={instructorKnowledge}>
                <HStack spacing={2}>
                  {renderRatingOptions(setInstructorKnowledge)}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Course Materials</FormLabel>
              <RadioGroup value={courseMaterials}>
                <HStack spacing={2}>
                  {renderRatingOptions(setCourseMaterials)}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Learning Environment</FormLabel>
              <RadioGroup value={learningEnvironment}>
                <HStack spacing={2}>
                  {renderRatingOptions(setLearningEnvironment)}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Overall Satisfaction</FormLabel>
              <RadioGroup value={overallSatisfaction}>
                <HStack spacing={2}>
                  {renderRatingOptions(setOverallSatisfaction)}
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Suggestions for Improvement</FormLabel>
              <Textarea placeholder="Your suggestions" value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Would you recommend this course to others?</FormLabel>
              <RadioGroup value={recommend} onChange={(value) => setRecommend(value)}>
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg" isDisabled={address === undefined}>Submit</Button>
          </VStack>
        </form>
        <ToastContainer />
      </Flex> : <Flex justifyContent={'center'} alignContent={'center'}>
        <Text fontSize={'3xl'}>Please Connect your wallet to submit feedback</Text>
      </Flex>
  );
}

export default GenericForm;
