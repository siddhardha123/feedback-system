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
import { useAccount } from 'wagmi'

const Dashboard = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    return (
       <Flex>
              <Box>
                <Heading>Dashboard</Heading>
                <Text>Address: {address}</Text>
              </Box>
       </Flex>
    );
};

export default Dashboard;
