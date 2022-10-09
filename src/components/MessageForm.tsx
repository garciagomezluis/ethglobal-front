/* eslint-disable camelcase */
import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Spacer,
    Textarea,
    useToast,
} from '@chakra-ui/react';

import { Upload } from 'upload-js';
import { useState } from 'react';

import FileUpload from './FileUpload';
import ImageViewer from './ImageViewer';

import { publish as sendPublication, verify } from '../connector';

import { useSigner } from 'wagmi';

import { ethers } from 'ethers';

export const MessageForm = ({
    onClose,
    isOpen,
    keyword,
}: {
    onClose: () => void;
    isOpen: boolean;
    keyword: string;
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { data: signer } = useSigner();

    const publish = async () => {
        if (
            title.trim() === '' ||
            description.trim() === '' ||
            link.trim() === '' ||
            files.length === 0
        ) {
            toast({
                title: 'Error',
                description: 'Please check your data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

            return;
        }

        setLoading(true);

        // @ts-ignore
        const upload = new Upload({ apiKey: 'free' });

        console.log(files);

        const { fileUrl } = await upload.uploadFile({
            file: files[0],
        });

        // pushsear a supabase

        try {
            const { address, message_id } = await sendPublication(
                title,
                description,
                fileUrl,
                link,
                keyword,
            );

            // @ts-ignore
            const tx = await signer.sendTransaction({
                to: address,
                value: ethers.utils.parseEther('0.1'),
            });

            await tx.wait();

            await verify(message_id);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Please retry',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.log((error as Error).message);
        }

        setLoading(false);
    };

    return (
        <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Configure your message</DrawerHeader>

                <DrawerBody>
                    <Box>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                disabled={loading}
                                placeholder="Get 10% off on the next Devcon"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt="5">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                disabled={loading}
                                placeholder="With your POAPs, You're elegible to get a discount on the next biggest event!"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <FormControl isDisabled={loading} mt="5">
                            <FormLabel>Please select an image for your product</FormLabel>
                            <Center>
                                {files.length === 0 ? (
                                    <FileUpload onSelect={setFiles} />
                                ) : (
                                    <ImageViewer
                                        disabled={loading}
                                        file={files[0]}
                                        remove={() => setFiles([])}
                                    />
                                )}
                            </Center>
                        </FormControl>

                        <FormControl mt="5">
                            <FormLabel>Link</FormLabel>
                            <Input
                                disabled={loading}
                                placeholder="https://campaign.com"
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                </DrawerBody>

                <DrawerFooter>
                    <HStack mt="5">
                        <Spacer />
                        <Button
                            disabled={loading}
                            isLoading={loading}
                            loadingText="Loading"
                            onClick={publish}
                        >
                            Publish
                        </Button>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default MessageForm;
