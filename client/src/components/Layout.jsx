// Layout.js
import React from 'react';
import { Flex, Box, Spacer, Link } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useAccount} from "wagmi";
import admin from "../config.js";

const Layout = ({ children }) => {
    const {address } = useAccount();
    return (
        <>
            <Flex as="nav" p={4} bg="blue.400" color="white" align="center">
                <Box p="2"><Link href={'/'}>Block Feedback</Link></Box>
                <Spacer />
                {
                    address && address === admin && <Link href="/analytics">Analytics</Link>
                }
                <Spacer />
                <Box>
                    <ConnectButton />
                </Box>
            </Flex>
            <main>{children}</main>
        </>
    );
};

export default Layout;
