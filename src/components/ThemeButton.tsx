import { IconButton, chakra, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { MFC } from '../utils';

export const ThemeButton: MFC = ({ ...props }) => {
    const Icon = useColorModeValue(MoonIcon, SunIcon);
    const { toggleColorMode } = useColorMode();

    return (
        <IconButton
            {...props}
            aria-label="toggle theme"
            icon={<Icon />}
            onClick={toggleColorMode}
        />
    );
};

export default chakra(ThemeButton);
