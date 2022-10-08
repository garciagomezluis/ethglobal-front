import { type ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
    useSystemColorMode: true,
};

const colors = {
    app: {},
};

const theme = extendTheme({ config, colors });

export default theme;
