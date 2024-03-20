import { useEffect, useState } from 'react';
import { Flex, Tooltip, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for routing
import { useAccount } from 'wagmi';
import { getSubmissions } from '../_services'
const Dashboard = () => {
    const { address } = useAccount();
    const subjects = ["OS", "DBMS", "OOPS","DSA","DAA"]
    const [subjectMap, setSubjectMap] = useState({
        "OS": false,
        "DBMS": false,
        "OOPS": false,
        "DSA" : false,
        "DAA" : false
    })

    const checkForSubmissions = async () => {
        try {
            const submissions = await getSubmissions(); // Wait for getSubmissions to complete
            submissions.forEach((submission) => {
                if (submission.address === address && subjects.includes(submission.subject)) {
                    setSubjectMap(prev => ({ ...prev, [submission.subject]: true }));
                }
            });
        } catch (error) {
            console.error('Error checking for submissions:', error);
        }
    }

    useEffect(() => {
        checkForSubmissions()
    }, [])


    return (
        address ?
            <Flex direction="column" align="center" mt={8}>
                <Heading as="h1" mb={4}>Fill the Feedback</Heading>
                <Text fontSize="lg" mb={4}>Welcome, {address}!</Text>
                <Flex justify="center" align="center" flexWrap="wrap">
                    {subjects.map(subject => (
                        <Tooltip key={subject} label={subjectMap[subject] ? "You already filled the form" : ""}>
                            <Link to={`/form/${subject}`}>
                                <Flex
                                    w="200px"
                                    h="100px"
                                    bg={subjectMap[subject] ? "gray.200" : "blue.300"}
                                    color="white"
                                    rounded="md"
                                    align="center"
                                    justify="center"
                                    m={4}
                                    _hover={{ bg: "blue.400" }}
                                    cursor={subjectMap[subject] ? "not-allowed" : "pointer"}
                                >
                                    {subject}
                                </Flex>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>
            </Flex> :
            <Flex justifyContent={'center'} alignContent={'center'}>
                <Text fontSize={'3xl'}>Please Connect your wallet to submit feedback</Text>
            </Flex>
    );
};

export default Dashboard;
