/* eslint-disable camelcase */

import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccount } from 'wagmi';

import { fetchMessages, subscribe } from '../connector';

import useJob from '../hooks/job';

function Messages() {
    const { go: doSubs, doing: doingSubs, data: dataSubs, error: errorSubs } = useJob(subscribe);

    const {
        go: getMessages,
        doing: doingMessages,
        data: messages,
        error: erroMessages,
    } = useJob(fetchMessages);

    const { isConnected, address } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate('/search');

            return;
        }

        doSubs();

        getMessages(address);
    }, []);

    return (
        <VStack align="start">
            {doingMessages && (
                <Center h="500px" w="full">
                    <Spinner />
                </Center>
            )}

            {(!messages || messages.length === 0) && (
                <Center h="400px" w="full">
                    <Text>Nothing to show =(</Text>
                </Center>
            )}

            {messages &&
                messages.map((message: any) => {
                    return (
                        <Text
                            _hover={
                                message.seen
                                    ? {}
                                    : { cursor: 'pointer', bg: 'pink.500', color: 'white' }
                            }
                            bg={message.seen ? 'gray' : 'transparent'}
                            p="4"
                            w="full"
                            onClick={
                                message.seen
                                    ? () => {}
                                    : () => navigate(`/message/${address}/${message.id}`)
                            }
                        >
                            {message.title}
                        </Text>
                    );
                })}
        </VStack>
    );
}

export default Messages;
