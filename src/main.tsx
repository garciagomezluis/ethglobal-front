import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, ChakraProvider, ColorModeScript, Container } from '@chakra-ui/react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MFC } from './utils';

import theme from '../theme';

import Header from './components/Header';
import ModalProvider from './components/Modal';

import Web3Provider from './context/Web3';

import Profile from './pages/Profile';
import Welcome from './pages/Welcome';

const Dapp: MFC = () => {
    return (
        <BrowserRouter>
            <Box>
                <Container maxW="container.lg">
                    <Header py="5" />
                </Container>
            </Box>
            <Container maxW="container.lg">
                <Routes>
                    <Route element={<Welcome />} path="/welcome" />
                    <Route element={<Profile />} path="/profile/:userAddress" />
                    <Route element={<Welcome />} path="*" />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Web3Provider>
                <ModalProvider>
                    <Dapp />
                </ModalProvider>
            </Web3Provider>
        </ChakraProvider>
    </React.StrictMode>,
);
