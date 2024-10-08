import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://personal-library-pi.vercel.app',
    //     changeOrigin: true,
    //     rewrite: (path) => path,
    //   },
    //   '/graphql': {
    //     target: 'https://personal-library-pi.vercel.app',
    //     changeOrigin: true,
    //     rewrite: (path) => path,
    //   },
    // },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
