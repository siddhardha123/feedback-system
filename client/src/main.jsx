import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    polygonMumbai
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {ChakraProvider} from "@chakra-ui/react";
import Layout from "./components/Layout.jsx";



const { chains, publicClient } = configureChains(
    [mainnet,polygon,optimism,arbitrum,base,zora,polygonMumbai],
    [
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <Layout>
            <App />
                    </Layout>
            </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    </React.StrictMode>,
)
