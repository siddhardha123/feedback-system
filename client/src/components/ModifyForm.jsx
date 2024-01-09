import React, { useState, useEffect } from 'react';
import {
    Box, Button, Text, Flex, FormControl, FormLabel, Input, Select, Tooltip, useToast, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

const ModifyForm = ({ existingForm, onSave }) => {
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({ type: '', content: '', options: [] });
    const toast = useToast();

    useEffect(() => {
        if (existingForm && existingForm.questions) {
            setQuestions(existingForm.questions);
        }
    }, [existingForm]);

    const openModal = (question = { type: '', content: '', options: [] }, index = -1) => {
        setCurrentQuestion({ ...question, index });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentQuestion({ type: '', content: '', options: [] });
        setIsModalOpen(false);
    };

    const handleQuestionChange = (e) => {
        setCurrentQuestion({ ...currentQuestion, content: e.target.value });
    };

    const handleQuestionTypeChange = (e) => {
        setCurrentQuestion({ ...currentQuestion, type: e.target.value, options: [] });
    };

    const handleOptionChange = (optionIndex, content) => {
        const newOptions = [...currentQuestion.options];
        newOptions[optionIndex].content = content;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const addOption = () => {
        setCurrentQuestion({ ...currentQuestion, options: [...currentQuestion.options, { content: '' }] });
    };

    const removeOption = (optionIndex) => {
        const newOptions = currentQuestion.options.filter((_, index) => index !== optionIndex);
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const saveQuestion = () => {
        if (currentQuestion.index >= 0) {
            // Editing existing question
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestion.index] = { ...currentQuestion };
            setQuestions(updatedQuestions);
        } else {
            // Adding new question
            setQuestions([...questions, { ...currentQuestion }]);
        }
        closeModal();
    };

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, qIndex) => qIndex !== index));
    };

    const handleSaveForm = () => {
        onSave(questions);
        toast({
            title: "Form saved.",
            description: "Your form has been saved successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right"
        });
    };

    return (
        <Flex direction="column" w="50%" mx="auto" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" mb={4}>Form Editor</Text>
            <Button colorScheme="blue" onClick={() => openModal()}>Add New Question</Button>
            {questions.map((question, index) => (
                <Box key={index} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                    <Tooltip label="Edit this question" hasArrow>
                        <IconButton aria-label="Edit question" icon={<EditIcon />} colorScheme="green" onClick={() => openModal(question, index)} size="sm" />
                    </Tooltip>
                    <Tooltip label="Delete this question" hasArrow>
                        <IconButton aria-label="Delete question" icon={<DeleteIcon />} colorScheme="red" onClick={() => deleteQuestion(index)} size="sm" />
                    </Tooltip>
                    <Text>{question.content}</Text>
                </Box>
            ))}
            <Button colorScheme="blue" onClick={handleSaveForm}>Save Form</Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentQuestion.index >= 0 ? 'Edit Question' : 'Add Question'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={3}>
                            <FormLabel>Question Type</FormLabel>
                            <Select value={currentQuestion.type} onChange={handleQuestionTypeChange}>
                                <option value="mcq">MCQ</option>
                                <option value="subjective">Subjective</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Question Content</FormLabel>
                            <Input value={currentQuestion.content} onChange={handleQuestionChange} />
                        </FormControl>
                        {currentQuestion.type === 'mcq' && currentQuestion.options.map((option, optionIndex) => (
                            <Flex key={optionIndex} alignItems="center">
                                <FormControl flex="1" mb={2}>
                                    <FormLabel>Option {optionIndex + 1}</FormLabel>
                                    <Input value={option.content} onChange={(e) => handleOptionChange(optionIndex, e.target.value)} />
                                </FormControl>
                                <IconButton aria-label="Remove option" icon={<DeleteIcon />} onClick={() => removeOption(optionIndex)} size="sm" ml={2} />
                            </Flex>
                        ))}
                        {currentQuestion.type === 'mcq' && (
                            <Button onClick={addOption}>Add Option</Button>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={saveQuestion}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ModifyForm;
