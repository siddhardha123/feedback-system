import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    VStack,
    Spacer,
    Link,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import admin from '../config.js';
import Admin from "./Admin.jsx";
import Student from "./Student.jsx";
import Temp from "./Temp.jsx";



const Dashboard = () => {
    const { address } = useAccount();

    const isAdmin = address === admin;

    return (
        <Flex>
            {isAdmin ? <Temp /> : <Student />}
        </Flex>
    );
};

export default Dashboard;
