import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ReactJs-Project/',
  server:{
    proxy:{
      '/ReactJs-Project/api':{
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ReactJs-Project/, '')
      },
      '/ReactJs-Project/images':{
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ReactJs-Project/, '')
      }
    }
  }
})
