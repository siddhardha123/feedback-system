import React, { useState } from 'react';
import {
    Box,
    Button,
    Text,
    SimpleGrid,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    FormControl,
    FormLabel,
    Input,
    Stack,
    IconButton, Flex
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';


const AdminDashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [forms, setForms] = useState([]); // This would be your form data
    const [questionType, setQuestionType] = useState('');
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([...questions, { type: questionType, content: '', options: questionType === 'mcq' ? ['', ''] : [] }]);
    };

    const updateQuestionContent = (index, content) => {
        const newQuestions = [...questions];
        newQuestions[index].content = content;
        setQuestions(newQuestions);
    };

    const updateOptionContent = (questionIndex, optionIndex, content) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = content;
        setQuestions(newQuestions);
    };

    const deleteQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
    };

    const handleNewForm = () => {
        // Logic to handle new form creation
        // Here you'd make your API call to save the form
        onClose(); // Close modal after saving
    };

    return (
        <Flex w="full">
            <Flex justify="space-between" w="full">
                <Text fontSize="5xl" m={'4'}>Welcome, Admin!</Text>
                <Button colorScheme="blue" onClick={onOpen} m={'8'}>Create New</Button>
            </Flex>

            <Flex >
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create a New Form</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Question Type</FormLabel>
                                <Select placeholder="Select option" onChange={(e) => setQuestionType(e.target.value)}>
                                    <option value="mcq">MCQ</option>
                                    <option value="subjective">Subjective</option>
                                </Select>
                            </FormControl>

                            {questions.map((question, index) => (
                                <Box key={index} mb={4} position="relative">
                                    <Button
                                        onClick={() => deleteQuestion(index)} // Correct usage of the arrow function
                                        aria-label="Delete Question"
                                    >delete</Button>
                                    <FormControl mb={2}>
                                        <FormLabel>Question {index + 1}</FormLabel>
                                        <Input
                                            value={question.content}
                                            onChange={(e) => updateQuestionContent(index, e.target.value)}
                                        />
                                    </FormControl>
                                    {question.type === 'mcq' && question.options.map((option, optionIndex) => (
                                        <FormControl key={optionIndex} mb={2}>
                                            <FormLabel>Option {optionIndex + 1}</FormLabel>
                                            <Input
                                                value={option}
                                                onChange={(e) => updateOptionContent(index, optionIndex, e.target.value)}
                                            />
                                        </FormControl>
                                    ))}
                                </Box>
                            ))}


                            {questionType && (
                                <Button colorScheme="green" onClick={addQuestion}>Add Question</Button>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleNewForm}>
                                Save Form
                            </Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>

        </Flex>

    );
};

export default AdminDashboard;
