import { chakra } from '@chakra-ui/react';

import { ConnectButton as Connect } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { MFC } from '../utils';

export const ConnectButton: MFC = ({ children, ...props }) => {
    const { isConnected } = useAccount();

    if (isConnected && children) return <>{children}</>;

    return <Connect {...props} />;
};

export default chakra(ConnectButton);
