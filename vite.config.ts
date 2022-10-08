import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// const production = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/ethglobal-front/',
    plugins: [react()],
    build: {
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    server: {
        host: true,
    },
});
