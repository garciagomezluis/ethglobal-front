/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

export type Tag = {
    keyword: string;
};

export type Volume = {
    volume: number;
    wallets: string[];
};

export const verify = async (messageId: string) => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('https://ethglobal-api.vercel.app/messages/verify', {
        method: 'POST',
        body: JSON.stringify({
            message_id: messageId,
        }),
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) throw new Error('Failed verifying');

    return response.json();
};

export const publish = async (
    title: string,
    description: string,
    image_url: string,
    link: string,
    keyword: string,
) => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('https://ethglobal-api.vercel.app/messages', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            image_url,
            link,
            keyword,
        }),
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) throw new Error('Failed publishing');

    return response.json();
};

export const fetchMessages = async (address: string): Promise<any> => {
    const response = await fetch(`https://ethglobal-api.vercel.app/messages?address=${address}`);

    if (response.status !== 200) throw new Error('Failed messages');

    return response.json();
};

export const fetchTags = async (): Promise<Tag[]> => {
    const response = await fetch('https://ethglobal-api.vercel.app/audiences');

    if (response.status !== 200) throw new Error('Failed fetching tags');

    return response.json();
};

export const watch = async (address: string, messageId: string): Promise<any> => {
    const response = await fetch(`https://ethglobal-api.vercel.app/messages/watch/`, {
        method: 'POST',
        body: JSON.stringify({ address, message_id: messageId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) throw new Error('Failed watching');

    return response.json();
};

export const subscribe = async (address: string) => {
    const response = await fetch('https://ethglobal-api.vercel.app/dataunions/subscribe', {
        method: 'POST',
        body: JSON.stringify({
            address,
        }),
    });

    if (response.status !== 200) throw new Error('Failed subscribing');

    return response.json();
};

export const fetchVolume = async ({ keywords }: { keywords: string }): Promise<Volume> => {
    const response = await fetch(
        `https://ethglobal-api.vercel.app/audiences/check-volume?q=${keywords}`,
    );

    if (response.status !== 200) throw new Error('Failed fetching volume');

    return response.json();
};

export const pushImages = async (files: File[]) => {
    const formData = new FormData();

    for (const file of files) {
        formData.append(file.name, file);
    }

    const response = await fetch('https://lucho-nft.herokuapp.com/nft/images', {
        method: 'POST',
        body: formData,
    });

    if (response.status !== 200) throw new Error('Failed images');

    return response.json();
};

export const pushMetadata = async (filenames: string[], attrs: any[]) => {
    const metadata = filenames.map((filename, idx) =>
        getMetadataERC1155(filename, attrs[idx], idx),
    );

    const response = await fetch('https://lucho-nft.herokuapp.com/nft/metadata', {
        method: 'POST',
        body: JSON.stringify({
            metadata,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) throw new Error('Failed metadata');

    return response.json();
};

const getMetadataERC1155 = (filename: string, attrs: any[], i: number) => {
    return {
        description: `Test collection. Layeralize. ETH GLOBAL 2022. Token #${i}`,
        external_url: 'https://github.com/garciagomezluis/web3-ethglobal',
        image: filename,
        name: `Layeralize ETH Global Collection #${i}`,
        attributes: attrs.map((attr: any) => {
            return {
                trait_type: attr.name,
                value: attr.value,
            };
        }),
    };
};
