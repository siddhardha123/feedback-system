import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
    Spacer, Link,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Home = () => {
    return (
        <Flex direction="column" minH="100vh"> {/* Updated to occupy full height */}
            {/* Navigation */}
            <Flex as="nav" p={4} bg="blue.400" color="white" align="center">
                <Box p="2">block feedback</Box>
                <Spacer />
                <Link>Analytics</Link>
                <Spacer />
                <Box>
                    <ConnectButton />
                </Box>
            </Flex>

            {/* Hero Section */}
            <Flex align="center" justify="center" bg="blue.100" flex="1"> {/* Updated for flexible expansion */}
                <VStack spacing={4} textAlign="center">
                    <Heading fontSize="8xl">
                        Give feedback that <span style={{ color: 'red' }}>matters</span>
                    </Heading>
                    <Text>private secure scalable</Text>
                    <Button colorScheme="blue" size="md">Get Started</Button>
                </VStack>
            </Flex>

            {/* Footer */}
            <Flex as="footer" py={4} bg="blue.700" color="white" justify="center">
                <Text>&copy; {new Date().getFullYear()} My Brand. All rights reserved.</Text>
            </Flex>
        </Flex>
    );
};

export default Home;
