import { Box, HStack, Text, chakra } from '@chakra-ui/react';

import { Link as RRDLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import ConnectButton from '../components/ConnectButton';

const Link = chakra(RRDLink);

function Welcome() {
    const { address } = useAccount();

    return (
        <Box>
            <Text>Hello World!</Text>

            <HStack>
                <Text mr="2">Do you want to check your profile?</Text>
                <ConnectButton>
                    <Link to={`/profile/${address}`}>Click here</Link>
                </ConnectButton>
            </HStack>
        </Box>
    );
}

export default Welcome;
