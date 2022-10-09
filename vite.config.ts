import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// const production = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
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
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
});
