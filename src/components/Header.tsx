import { CalendarIcon, HamburgerIcon, InfoIcon } from '@chakra-ui/icons';
import {
    HStack,
    IconButton,
    Spacer,
    chakra,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';

import { Menu, MenuItem, MenuSection } from './Menu';

import Logo from './Logo';

import ConnectButton from './ConnectButton';
import { useEffect } from 'react';

import { MFC } from '../utils';

export const Header: MFC = ({ ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, sm: false });

    useEffect(() => {
        window.addEventListener('resize', onClose, false);

        return () => {
            window.removeEventListener('resize', onClose);
        };
    }, []);

    return (
        <HStack {...props}>
            <Logo />
            <Spacer />
            {isMobile && (
                <IconButton
                    aria-label="open menu"
                    icon={<HamburgerIcon />}
                    onClick={() => onOpen()}
                />
            )}
            <Menu isOpen={isOpen} small={isMobile} onClose={onClose}>
                <MenuSection>
                    <MenuItem>
                        <ConnectButton />
                    </MenuItem>
                </MenuSection>

                <MenuSection>
                    <MenuItem
                        icon={CalendarIcon}
                        text="hello"
                        onClick={() => console.log('hello')}
                    />
                    <MenuItem selected icon={InfoIcon} text="world">
                        <MenuItem text="how">
                            <MenuItem text="are" />
                            <MenuItem text="you" onClick={() => console.log('you')} />
                        </MenuItem>
                        <MenuItem text="today" onClick={() => console.log('today')} />
                    </MenuItem>
                </MenuSection>
            </Menu>
        </HStack>
    );
};

export default chakra(Header);
