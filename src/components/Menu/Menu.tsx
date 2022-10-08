import { Children } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    VStack,
} from '@chakra-ui/react';

import Logo from '../Logo';

import { MFC } from '../../utils';

export const Menu: MFC<{ isOpen: boolean; onClose: () => void; small?: boolean }> = ({
    children,
    isOpen,
    onClose,
    small = true,
}) => {
    const childrenArray = Children.toArray(children);

    if (small) {
        return (
            <Drawer isOpen={isOpen} placement="right" size="full" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton aria-label="close menu" />
                    <DrawerHeader>
                        <Logo />
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack align="start" h="full">
                            {children}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }

    return <HStack>{childrenArray[0]}</HStack>;
};

export default Menu;
