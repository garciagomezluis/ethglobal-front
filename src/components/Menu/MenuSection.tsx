import { Box } from '@chakra-ui/react';
import { MFC } from '../../utils';

export const MenuSection: MFC = ({ children }) => {
    return <Box w="full">{children}</Box>;
};

export default MenuSection;
