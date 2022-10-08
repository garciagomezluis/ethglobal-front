import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Text } from '@chakra-ui/react';

import { useAccount } from 'wagmi';

import { MFC } from '../utils';

import MintModal from '../components/MintModal';

import { useModal } from '../components/Modal';

export const Profile: MFC = () => {
    const { isConnected, address } = useAccount();
    const navigate = useNavigate();
    const { userAddress } = useParams();

    const { open, close, toggleLock } = useModal();

    const openModal = () => {
        open({
            element: MintModal,
            props: {
                onClose: (error: unknown) => {
                    close();
                    if (!error) console.log('ok');
                },
                toggleLock,
                attrs: [],
                files: [],
            },
            locked: false,
            title: 'Collection minting',
        });
    };

    useEffect(() => {
        if (!isConnected || address !== userAddress) {
            navigate('/welcome');
        }
    }, []);

    return (
        <>
            <Text>Hello user {address}</Text>

            <Button onClick={() => openModal()}>Mint</Button>
        </>
    );
};

export default Profile;
