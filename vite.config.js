
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://customer-service-ai-production-c797.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
