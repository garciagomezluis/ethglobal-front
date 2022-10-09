/* eslint-disable camelcase */
import {
    Box,
    Button,
    Center,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Spacer,
    Spinner,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';

import { Select } from 'chakra-react-select';

import { useEffect, useState } from 'react';

import MessageForm from '../components/MessageForm';

import { Tag, fetchTags, fetchVolume } from '../connector';

import useJob from '../hooks/job';

function Search() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [options, setOptions] = useState<any[]>([]);

    const [query, setQuery] = useState('');

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

    useEffect(() => {
        const options =
            tags &&
            tags.map((tag: Tag) => ({
                label: tag.keyword,
                value: tag.keyword,
            }));

        setOptions(options);
    }, [tags]);

    const onChangeHandler = (e: any) => {
        getVolume({ keywords: e.value });
        setQuery(e.value);
    };

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            getVolume({ keywords: e.target.value });
            setQuery(e.target.value);

            e.target.blur();
        }
    };

    console.log(errorVolume);

    return (
        <>
            <MessageForm isOpen={isOpen} keyword={query} onClose={onClose} />
            <Container maxW="container.lg">
                <VStack w="full">
                    {tags && (
                        <FormControl mb="5" mt="44">
                            <FormLabel>Select your audience</FormLabel>
                            <Select
                                options={options}
                                onChange={onChangeHandler}
                                onKeyDown={onKeyDownHandler}
                            />
                        </FormControl>
                    )}

                    {query && (
                        <Box mt="32" w="full">
                            <>
                                <Text fontSize="bold">{query}</Text>

                                {doingVolume && (
                                    <Center h="100px">
                                        <Spinner size="xl" />
                                    </Center>
                                )}

                                {volume && (
                                    <Text mt="2">
                                        Target volume: {volume.volume} (unique addresses)
                                    </Text>
                                )}

                                {errorVolume && <Text mt="2">Please, try new keywords</Text>}

                                {volume && !errorVolume && (
                                    <HStack>
                                        <Spacer />
                                        <Button onClick={onOpen}>Configure Message</Button>
                                    </HStack>
                                )}
                            </>
                        </Box>
                    )}
                </VStack>
            </Container>
        </>
    );
}

export default Search;
