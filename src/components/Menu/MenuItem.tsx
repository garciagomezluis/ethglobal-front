import { Box, HStack, Icon, Text, VStack, chakra, useColorModeValue } from '@chakra-ui/react';
import { MFC, useToggle } from '../../utils';

export const MenuItem: MFC<{
    text?: string;
    onClick?: () => void;
    icon?: any;
    selected?: boolean;
}> = ({ children, text, onClick, icon: MenuItemIcon, selected = false, ...props }) => {
    const { value: displayChild, toggle: toggleDisplayChild } = useToggle(false);

    const colorSelected = useColorModeValue('black', 'white');
    const colorLowlight = useColorModeValue('gray.400', 'gray.500');
    const colorHighlight = useColorModeValue('gray.500', 'gray.400');

    function onClickHandler() {
        if (onClick) onClick();

        if (children) toggleDisplayChild();
    }

    const clickable = children || onClick;

    let style: any = {
        color: colorHighlight,
    };

    if (clickable) {
        style = {
            color: colorLowlight,
            _hover: {
                color: colorHighlight,
            },
        };
    }

    if (selected) {
        style = {
            color: colorSelected,
        };
    }

    if (children && !text) return <Box {...props}>{children}</Box>;

    return (
        <Box mt="2">
            <HStack cursor={clickable ? 'pointer' : 'default'} onClick={onClickHandler}>
                {MenuItemIcon && (
                    <Icon
                        aria-label={text}
                        as={MenuItemIcon}
                        color={selected ? colorSelected : colorLowlight}
                        mr="6"
                    />
                )}
                <Text
                    pl={!MenuItemIcon ? '12' : '0'}
                    sx={style}
                    textTransform="capitalize"
                    {...props}
                >
                    {text}
                </Text>
            </HStack>
            {children && (
                <VStack align="start" display={displayChild ? 'flex' : 'none'} pl="10">
                    {children}
                </VStack>
            )}
        </Box>
    );
};

export default chakra(MenuItem);
