import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Textarea,
    useToast,
    Select,
    Checkbox,
    CheckboxGroup,
    Stack,
    Radio,
    RadioGroup
} from '@chakra-ui/react';
import {useAccount} from "wagmi";
import admin from '../config.js'

const StudentFeedback = () => {
    const {address} = useAccount()
    const [feedback, setFeedback] = useState({
        courseName: '',
        instructor: '',
        rating: '3',
        comments: '',
        suggestions: '',
        wouldRecommend: []
    });

    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(feedback)
        toast({
            title: 'Feedback Submitted',
            description: "We've received your feedback.",
            status: 'success',
            duration: 9000,
            position: 'bottom-right',
            isClosable: true,
        });
        // Here you can also send the feedback data to a server
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleCheckboxChange = (value) => {
        setFeedback({ ...feedback, wouldRecommend: value });
    };

    return (
        <Flex direction="column" align="center" justify="center" p={5} mx={'auto'}>
            <Heading mb={4}>Course Feedback Form</Heading>
            <Flex>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Course Name</FormLabel>
                        <Input name="courseName" onChange={handleInputChange} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Instructor</FormLabel>
                        <Input name="instructor" onChange={handleInputChange} />
                    </FormControl>
                    <FormControl as="fieldset" mt={4}>
                        <FormLabel as="legend">Rating</FormLabel>
                        <RadioGroup name="rating" defaultValue="3" onChange={handleInputChange}>
                            <Stack direction="row">
                                <Radio value="1">1</Radio>
                                <Radio value="2">2</Radio>
                                <Radio value="3">3</Radio>
                                <Radio value="4">4</Radio>
                                <Radio value="5">5</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comments</FormLabel>
                        <Textarea name="comments" onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Suggestions for Improvement</FormLabel>
                        <Textarea name="suggestions" onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Would you recommend this course to others?</FormLabel>
                        <CheckboxGroup colorScheme="green" onChange={handleCheckboxChange}>
                            <Stack spacing={5} direction="row">
                                <Checkbox value="Yes">Yes</Checkbox>
                                <Checkbox value="No">No</Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    </FormControl>
                    <Button mt={4} colorScheme="blue" type="submit" isDisabled={address !== admin}>Submit Feedback</Button>
                </form>
            </Flex>
        </Flex>
    );
};

export default StudentFeedback;
