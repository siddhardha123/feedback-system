import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Grid
} from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

const FormCreator = () => {
    const [forms, setForms] = useState([]);
    const [newFormTitle, setNewFormTitle] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingFormIndex, setEditingFormIndex] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState({ text: '', options: [] });

    const handleAddForm = () => {
        if (newFormTitle) {
            setForms([...forms, { title: newFormTitle, questions: [] }]);
            setNewFormTitle('');
        }
    };

    const handleAddOrUpdateQuestion = () => {
        const updatedForms = forms.map((form, index) => {
            if (index === editingFormIndex) {
                return {
                    ...form,
                    questions: editingQuestion.id != null ? form.questions.map((q, qIndex) => qIndex === editingQuestion.id ? editingQuestion : q) : [...form.questions, { ...editingQuestion, id: form.questions.length }]
                };
            }
            return form;
        });
        setForms(updatedForms);
        onClose();
        setEditingQuestion({ text: '', options: [] });
    };

    const handleEditQuestion = (formIndex, questionIndex) => {
        setEditingFormIndex(formIndex);
        setEditingQuestion({ ...forms[formIndex].questions[questionIndex], id: questionIndex });
        onOpen();
    };

    const handleDeleteQuestion = (formIndex, questionIndex) => {
        const updatedForms = forms.map((form, index) => {
            if (index === formIndex) {
                return { ...form, questions: form.questions.filter((_, qIndex) => qIndex !== questionIndex) };
            }
            return form;
        });
        setForms(updatedForms);
    };

    const handleDeleteForm = (formIndex) => {
        setForms(forms.filter((_, index) => index !== formIndex));
    };

    const handleEditFormTitle = (formIndex, newTitle) => {
        const updatedForms = forms.map((form, index) => {
            if (index === formIndex) {
                return { ...form, title: newTitle };
            }
            return form;
        });
        setForms(updatedForms);
    };

    return (
        <Flex direction="column" align="center" p={5} mx={'auto'}>
            <Flex justify="center" >
                <FormControl mb={4}>
                    <FormLabel textAlign={'center'}>New Form Title</FormLabel>
                        <Input value={newFormTitle} onChange={(e) => setNewFormTitle(e.target.value)} />
                        <Button mt={2} colorScheme="blue" onClick={handleAddForm}>Add New Form</Button>
                </FormControl>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            {forms.map((form, formIndex) => (
                <Box key={formIndex} p={4} boxShadow="md" mb={4} borderRadius="md">
                    <HStack justifyContent="space-between">
                        <Input value={form.title} onChange={(e) => handleEditFormTitle(formIndex, e.target.value)} />
                        <IconButton icon={<CloseIcon />} onClick={() => handleDeleteForm(formIndex)} />
                    </HStack>
                    <VStack align="stretch" mt={2}>
                        {form.questions.map((question, qIndex) => (
                            <HStack key={qIndex} p={2} bg="gray.100" borderRadius="md" justifyContent="space-between">
                                <VStack align="start">
                                    <Box>{question.text}</Box>
                                    {question.options.map((option, oIndex) => (
                                        <Box key={oIndex}>- {option}</Box>
                                    ))}
                                </VStack>
                                <HStack>
                                    <IconButton icon={<EditIcon />} onClick={() => handleEditQuestion(formIndex, qIndex)} />
                                    <IconButton icon={<CloseIcon />} onClick={() => handleDeleteQuestion(formIndex, qIndex)} />
                                </HStack>
                            </HStack>
                        ))}
                        <Button colorScheme="teal" onClick={() => { setEditingFormIndex(formIndex); onOpen(); }}>Add Question</Button>
                    </VStack>
                </Box>
            ))}
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editingQuestion.id != null ? 'Edit Question' : 'New Question'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Question Text</FormLabel>
                            <Input value={editingQuestion.text} onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Options (comma-separated)</FormLabel>
                            <Input value={editingQuestion.options.join(', ')} onChange={(e) => setEditingQuestion({ ...editingQuestion, options: e.target.value.split(',').map(opt => opt.trim()) })} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddOrUpdateQuestion}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default FormCreator;
