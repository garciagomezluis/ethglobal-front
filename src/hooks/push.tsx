/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */

import { useEffect, useState } from 'react';

import { CustomHook } from '../utils';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import { abi } from '../testabi.json';
import useJob from './job';
import { pushImages, pushMetadata } from '../connector';

const CONTRACT_ADDRESS = '0x0BD6166f462896AeaC4ba5cABDbf2c2eDbDD076C';

export interface UsePushConfig {
    files: File[];
    attrs: any[];
}

export interface UsePushProps {
    images: any;
    metadata: any;
    tx: any;
    doing: boolean;
    done: boolean;
    error: string;
}

const useContract = (cid: string | null, amount: number) => {
    const { config } = usePrepareContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: abi,
        functionName: 'createCollection',
        enabled: cid !== null,
        args: [cid, amount],
    });

    const { writeAsync, data } = useContractWrite(config);

    const { status } = useWaitForTransaction({
        hash: data?.hash,
    });

    return {
        writeAsync,
        status,
        txHash: data?.hash,
    };
};

const usePublish = (files: File[], attrs: any[]) => {
    const images = useJob(pushImages);
    const metadata = useJob(pushMetadata);

    const { go: goImages, error: errorImages } = images;
    const { go: goMetadata, error: errorMetadata } = metadata;

    const publish = async () => {
        const { filenames } = await goImages(files);

        if (errorImages) return null;

        const { cid } = await goMetadata(filenames, attrs);

        if (errorMetadata) return null;

        return cid;
    };

    return {
        images,
        metadata,
        publish,
    };
};

export const usePush: CustomHook<UsePushConfig, UsePushProps> = ({ files, attrs }) => {
    const [error, setError] = useState('');

    const { images, metadata, publish } = usePublish(files, attrs);

    const {
        go: push,
        done: doneUpload,
        doing: doingUpload,
        data: cid,
        error: errorPublish,
    } = useJob(publish);

    const { writeAsync, status: statusTx, txHash } = useContract(cid, files.length);

    const errorTx = statusTx === 'error' || error !== '';
    const doneTx = statusTx === 'success' || errorTx;
    const doingTx = doneUpload && cid !== null && !doneTx;

    const tx = {
        error: errorTx,
        done: doneTx,
        doing: doingTx,
        hash: txHash,
    };

    const doing = doingUpload || doingTx;
    const done = doneUpload && doneTx;

    useEffect(() => {
        // @ts-ignore
        setError(errorTx || images.error || metadata.error);
    }, [errorTx, images.error, metadata.error]);

    useEffect(() => {
        push(files, attrs);
    }, []);

    useEffect(() => {
        if (!errorPublish && doingTx && writeAsync) {
            writeAsync().catch((error) => setError(`Please, try again: ${error.message}`));
        }
    }, [writeAsync]);

    useEffect(() => {
        if (statusTx === 'error') setError('Please, check the transaction and try again');
    }, [statusTx]);

    return { images, metadata, tx, doing, done, error };
};

export default usePush;
