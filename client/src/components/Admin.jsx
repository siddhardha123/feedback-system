import React, { useState } from 'react';
import {Box, Button, Flex, Grid, Text, useColorModeValue} from '@chakra-ui/react';
import ModifyForm from './ModifyForm';

const AdminDashboard = () => {
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [isFormEditorOpen, setIsFormEditorOpen] = useState(false);

    const openFormEditor = (form = null) => {
        setCurrentForm(form);
        setIsFormEditorOpen(true);
    };

    const handleFormSave = (questions) => {
        if (currentForm) {
            setForms(forms.map(form => form.id === currentForm.id ? {...form, questions} : form));
        } else {
            const newForm = { id: Date.now(), questions };
            setForms([...forms, newForm]);
        }
        setIsFormEditorOpen(false);
    };

    const cardBackground = useColorModeValue("gray.100", "gray.700");

    return (
        <Flex direction="column" w="full" p={4}>
            <Flex justify={'space-between'}>
                <Text fontSize={'5xl'}>Welcome Admin</Text>
                <Button mb={4} colorScheme="teal" onClick={() => openFormEditor()}>
                    New Form
                </Button>
            </Flex>
            <Text fontSize={'4xl'}>Forms:</Text>
            {forms.length === 0 && <Text fontSize={'xl'}>No forms created yet.</Text>}
            <Grid  templateRows="repeat(2, 1fr)"
                   templateColumns="repeat(4, 1fr)"
                   gap={6}  >
            {forms.map(form => (
                <Flex
                    key={form.id}
                    mb={4}
                    p={5}
                    direction={'column'}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    bg="gray.100"  // Light background for the form cards
                >
                    <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
                        Form {form.id}
                    </Text>
                    <Flex><Button colorScheme="blue" _hover={{ bg: "blue.500" }} onClick={() => openFormEditor(form)}>
                        Edit
                    </Button>
                        <Button colorScheme="red" _hover={{ bg: "blue.500" }} onClick={() => openFormEditor(form)}>
                            Delete
                        </Button>


                    </Flex>

                </Flex>
            ))}
            </Grid>
            <Flex>
                {isFormEditorOpen && <ModifyForm existingForm={currentForm} onSave={handleFormSave} />}
            </Flex>

        </Flex>

    );
};

export default AdminDashboard;
