/* eslint-disable react/no-children-prop */
import { Button, Code, Link, List, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';

import { FC, useEffect } from 'react';

import { useAccount } from 'wagmi';

import { usePage } from '../hooks/page';
import { usePush } from '../hooks/push';

import ProgressItem, { ProgressStatus } from './ProgressItem';

const getProgressStatus = (
    prevFailed: boolean,
    doing: boolean,
    done: boolean,
    error: boolean,
): ProgressStatus => {
    if (prevFailed) return 'cancelled';

    if (doing) return 'doing';

    if (error) return 'failed';

    if (done) return 'ok';

    return 'todo';
};

const getStatus = (images: any, metadata: any, tx: any) => {
    const { doing: doingImages, done: doneImages, error: errorImages } = images;
    const { doing: doingMetadata, done: doneMetadata, error: errorMetadata } = metadata;
    const { doing: doingTx, done: doneTx, error: errorTx } = tx;

    const statusImages = getProgressStatus(false, doingImages, doneImages, errorImages);
    const statusMetadata = getProgressStatus(
        statusImages === 'failed' || statusImages === 'cancelled',
        doingMetadata,
        doneMetadata,
        errorMetadata,
    );
    const statusTx = getProgressStatus(
        statusMetadata === 'failed' || statusMetadata === 'cancelled',
        doingTx,
        doneTx,
        errorTx,
    );

    return {
        statusImages,
        statusMetadata,
        statusTx,
    };
};

const StepsView: FC<{
    images: any;
    metadata: any;
    tx: any;
}> = ({ images, metadata, tx }) => {
    const { statusImages, statusMetadata, statusTx } = getStatus(images, metadata, tx);

    const { hash } = tx;

    return (
        <>
            <VStack w="full">
                <Text color="pink.500" fontWeight="bold" w="full">
                    Uploading resources
                </Text>
                <List mt="15px !important" spacing={3} w="full">
                    <ProgressItem status={statusImages} summary="Uploading images to IPFS">
                        <Text fontSize="sm">This way, images will live forever off chain.</Text>
                    </ProgressItem>

                    <ProgressItem status={statusMetadata} summary="Uploading NFTs metadata to IPFS">
                        <Text fontSize="sm">
                            NFTs metadata is a way to describe the images you are uploading to
                            create the collection.
                        </Text>
                    </ProgressItem>
                </List>
            </VStack>
            <VStack mt="5" w="full">
                <Text color="pink.500" fontWeight="bold" w="full">
                    Finally
                </Text>
                <List spacing={3} w="full">
                    <ProgressItem
                        children={
                            hash && (
                                <Link
                                    color="pink.500"
                                    href={`https://mumbai.polygonscan.com/tx/${hash}`}
                                    ml="20"
                                    target="_blank"
                                >
                                    View on block explorer
                                </Link>
                            )
                        }
                        status={statusTx}
                        summary="Transaction sign"
                    />
                </List>
            </VStack>
        </>
    );
};

const DisclaimerView: FC<any> = ({ files, onMintConfirm }) => {
    const { address } = useAccount();

    return (
        <>
            <ModalBody>
                <VStack>
                    <Text>
                        {files.length} images will integrate the collection. This might take a few
                        minutes. You will be required to sign a transaction as the last operation
                        with a network fee. Please, do not close the tab once confirmed.
                    </Text>
                    <Code mt="2" p="1">
                        {address}
                    </Code>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onMintConfirm}>Confirm</Button>
            </ModalFooter>
        </>
    );
};

const ProgressView: FC<any> = ({ files, attrs, toggleLock, onClose }) => {
    const { images, metadata, tx, doing, done, error } = usePush({ files, attrs });

    useEffect(() => {
        if (done) toggleLock();
    }, [done]);

    return (
        <>
            <ModalBody>
                <StepsView images={images} metadata={metadata} tx={tx} />
                {done && <Text mt="5">{error || 'Collection uploaded successfully'}</Text>}
            </ModalBody>
            <ModalFooter>
                <Button isLoading={doing} loadingText="Loading" onClick={() => onClose(error)}>
                    Done
                </Button>
            </ModalFooter>
        </>
    );
};

export const MintModal: FC<any> = ({ onClose, toggleLock, files, attrs }) => {
    // TODO: probar supabase pushear la data a nftstorage
    // TODO: factorizar en un hook
    // TODO: i18n
    // TODO: config metadata
    // TODO: show link a collection

    const { page, setPage } = usePage({ pages: ['disclaimer', 'progress'] });

    const onMintConfirm = async () => {
        toggleLock();

        setPage('progress');
    };

    if (page === 'disclaimer') {
        return <DisclaimerView files={files} onMintConfirm={onMintConfirm} />;
    }

    if (page === 'progress') {
        return (
            <ProgressView attrs={attrs} files={files} toggleLock={toggleLock} onClose={onClose} />
        );
    }

    return <></>;
};

export default MintModal;
