import '@rainbow-me/rainbowkit/styles.css';

import {
    RainbowKitProvider,
    darkTheme,
    getDefaultWallets,
    lightTheme,
} from '@rainbow-me/rainbowkit';

import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { MFC } from '../utils';
import { useColorModeValue } from '@chakra-ui/react';

const { chains, provider } = configureChains([chain.polygon], [publicProvider()]);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export const Web3Provider: MFC = ({ children }) => {
    const theme = useColorModeValue(lightTheme, darkTheme);

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                theme={theme({
                    borderRadius: 'medium',
                })}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default Web3Provider;
