import { type ThemeConfig, extendTheme } from '@chakra-ui/react';

import FileUpload from './src/FileUpload';
import ImageOptions from './src/ImageOptions';

const config: ThemeConfig = {
    useSystemColorMode: true,
};

const components = {
    FileUpload,
    ImageOptions,
};

const colors = {
    app: {},
};

const theme = extendTheme({ config, colors, components });

export default theme;
