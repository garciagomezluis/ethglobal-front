/* eslint-disable camelcase */

import { Center, Image, Link, Spinner, Text, VStack } from '@chakra-ui/react';

import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useAccount } from 'wagmi';

import { watch } from '../connector';

import useJob from '../hooks/job';

function Message() {
    const { go, doing, data, error } = useJob(watch);

    const { isConnected, address } = useAccount();
    const navigate = useNavigate();
    const { messageId, requestedAddress } = useParams();

    useEffect(() => {
        if (!isConnected || address !== requestedAddress) {
            navigate('/search');

            return;
        }

        go(address, messageId);
    }, []);

    return (
        <VStack align="start">
            {doing && (
                <Center h="500px" w="full">
                    <Spinner />
                </Center>
            )}

            {!doing && data && (
                <VStack>
                    <Text>{data.title}</Text>
                    <Text>{data.description}</Text>

                    <Link href={data.link}>
                        <Image src={data.image_url} />
                    </Link>
                </VStack>
            )}
        </VStack>
    );
}

export default Message;
