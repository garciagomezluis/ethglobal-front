import { ArrowForwardIcon, CheckIcon, CloseIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Collapse, HStack, Spacer, Spinner, Text } from '@chakra-ui/react';
import { MFC, useToggle } from '../utils';

export type ProgressStatus = 'todo' | 'doing' | 'ok' | 'failed' | 'cancelled';

export const ProgressItem: MFC<{
    status: ProgressStatus;
    summary: string;
}> = ({ status, summary, children }) => {
    const { value: open, toggle } = useToggle(false);

    let Icon = ArrowForwardIcon;

    if (status === 'ok') Icon = CheckIcon;
    if (status === 'failed') Icon = CloseIcon;
    if (status === 'cancelled') Icon = NotAllowedIcon;

    const infoText = open ? 'Close' : 'Details';

    return (
        <Box>
            <HStack mb={children ? '1' : '0'}>
                {status === 'doing' && <Spinner mr="1" size="xs" />}
                {status !== 'doing' && <Icon aria-label={summary} as={Icon} mb="1" />}
                <Text>{summary}</Text>
                {children && (
                    <>
                        <Spacer />
                        <Text cursor="pointer" onClick={() => toggle()}>
                            {infoText}
                        </Text>
                    </>
                )}
            </HStack>
            {children && (
                <Collapse animateOpacity in={open}>
                    {children}
                </Collapse>
            )}
        </Box>
    );
};

export default ProgressItem;
