/* eslint-disable camelcase */
import {
    Box,
    Button,
    Center,
    Checkbox,
    CheckboxGroup,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import MessageForm from '../components/MessageForm';

import { Tag, fetchTags, fetchVolume } from '../connector';

import useJob from '../hooks/job';

// interface Poap {
//     name: string;
//     image_url: string;
//     description: string;
//     fancy_id: string;
//     start_date: string;
//     end_date: string;
//     country: string;
//     city: string;
// }

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const query = searchParams.get('query') || '';

    const {
        go: getVolume,
        doing: doingVolume,
        data: volume,
        error: errorVolume,
    } = useJob(fetchVolume);

    const { go: getTags, data: tags } = useJob(fetchTags);

    useEffect(() => {
        getTags();
    }, []);

    return (
        <>
            <MessageForm isOpen={isOpen} keyword={query} onClose={onClose} />
            <Container maxW="container.lg">
                {tags && (
                    <FormControl mt="2">
                        <FormLabel>Select one of ours tags</FormLabel>
                        <CheckboxGroup colorScheme="pink">
                            <HStack>
                                {tags.map((tag: Tag) => (
                                    <Checkbox key={tag.name} value={tag.name}>
                                        {tag.name}
                                    </Checkbox>
                                ))}
                            </HStack>
                        </CheckboxGroup>
                    </FormControl>
                )}
                <Box>
                    <FormControl mt="2">
                        <FormLabel>Search by keywords</FormLabel>
                        <HStack>
                            <Input
                                disabled={doingVolume}
                                placeholder="defi latam"
                                value={query}
                                onChange={(e) => setSearchParams({ query: e.target.value })}
                            />
                            <Button
                                disabled={query === '' || doingVolume}
                                onClick={() => getVolume({ keywords: query })}
                            >
                                Search
                            </Button>
                        </HStack>
                    </FormControl>

                    <>
                        {doingVolume && (
                            <Center h="400px">
                                <Spinner size="xl" />
                            </Center>
                        )}

                        {volume && <Text>Current volume: {volume.volume}</Text>}

                        {errorVolume && <Text>Please, try new keywords</Text>}
                    </>
                </Box>

                <Button onClick={onOpen}>Configure Message</Button>

                {/*

                {Array.from(convoMessages).map(([peerAddress, messages]) => {
                    return messages.map(({ content }) => (
                        <Text key={content.id}>
                            {peerAddress} - {content}
                        </Text>
                    ));
                })} */}
            </Container>
        </>
    );
}

export default Search;
