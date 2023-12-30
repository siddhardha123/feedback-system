import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Text,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Tooltip,
    useToast
} from '@chakra-ui/react';

const ModifyForm = ({ existingForm, onSave }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (existingForm && existingForm.questions) {
            setQuestions(existingForm.questions);
        }
    }, [existingForm]);

    const addQuestion = () => {
        if (!selectedQuestionType) return;

        const newQuestion = {
            type: selectedQuestionType,
            content: '',
            options: selectedQuestionType === 'mcq' ? [{ id: 1, content: '' }] : []
        };
        setQuestions([...questions, newQuestion]);
        setSelectedQuestionType('');
    };

    const updateQuestionContent = (index, content) => {
        const newQuestions = [...questions];
        newQuestions[index].content = content;
        setQuestions(newQuestions);
    };

    const updateOptionContent = (questionIndex, optionIndex, content) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].content = content;
        setQuestions(newQuestions);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        const newOption = { id: newQuestions[questionIndex].options.length + 1, content: '' };
        newQuestions[questionIndex].options.push(newOption);
        setQuestions(newQuestions);
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
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
        });
    };

    return (
        <Flex direction="column" w="full" mx={'10'}>
            <Text fontSize="2xl" mb={4}>Form Editor</Text>
            <Flex>
                <Select placeholder="Select question type"
                        value={selectedQuestionType}
                        onChange={(e) => setSelectedQuestionType(e.target.value)}>
                    <option value="mcq">MCQ</option>
                    <option value="subjective">Subjective</option>
                </Select>
                <Button colorScheme="blue" onClick={addQuestion}>Add Question</Button>
            </Flex>
            {questions.map((question, index) => (
                <Flex key={index} mb={4} p={4} borderWidth="1px" borderRadius="lg" direction={'column'}>
                    <Tooltip label="Delete this question" hasArrow>
                        <Button colorScheme="red" onClick={() => deleteQuestion(index)} size="sm">Delete</Button>
                    </Tooltip>
                    <FormControl mb={2} mt={2}>
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
                                value={option.content}
                                onChange={(e) => updateOptionContent(index, optionIndex, e.target.value)}
                            />
                            <Button onClick={() => removeOption(index, optionIndex)}>Remove Option</Button>
                        </FormControl>
                    ))}
                    {question.type === 'mcq' && (
                        <Button onClick={() => addOption(index)}>Add Option</Button>
                    )}
                </Flex>
            ))}
            <Button colorScheme="blue" onClick={handleSaveForm}>Save Form</Button>
        </Flex>
    );
};

export default ModifyForm;
