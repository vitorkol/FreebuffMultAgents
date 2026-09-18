import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy do dev server para o backend Laravel (Sprint 1: autenticação).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // secure: false,
      },
    },
  },
})
