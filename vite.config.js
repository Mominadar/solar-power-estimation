import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config())

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "nllb",
      filename: "remoteEntry.js",
      exposes: {
         './SolarEstimator': './src/main'
      },
      shared: ['react','react-dom']
    })
  ],
  base: process.env.NODE_ENV == 'production' ? process.env.VITE_BASE_URL_PROD : process.env.VITE_BASE_URL,
  build: {
    rollupOptions: {
      external:[],
    },
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
