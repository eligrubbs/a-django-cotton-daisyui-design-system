import { build, defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    root: 'frontend',
    plugins: [
        tailwindcss({
            optimize: { minify: true }
        }),
    ],

    build: {
        // Place in dedicated subfolder as non-vite assets. Parent directory matches a Django STATICFILES_DIRS entry
        outDir: path.resolve(__dirname, './example/static/vite/'),
        emptyOutDir: true, // can overwrite since we are touching an isolated sub-directory.
        manifest: false, // While we are technically integrating with a backend framework, we don't need this

        rolldownOptions: {

            input: {
                'app': path.resolve(__dirname, 'frontend/src/css/app.css'),
                'index': path.resolve(__dirname, 'frontend/src/js/index.js'),
            },

            output: {
                // Want stable names for the main files
                entryFileNames: `js/[name].js`,
                // Prevents filename collisions that I am not smart enough to forsee
                chunkFileNames: `js/[name]-[hash].js`,
                assetFileNames: (assetInfo) => {
                if (assetInfo.names?.some(name => name.endsWith('.css'))) {
                    return 'css/[name][extname]'
                }
                return `[ext]/[name]-[extname]`;
                }
            }
        },

    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'frontend'),
        },
    },
})