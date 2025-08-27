import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Pro root domény
  build: {
    outDir: 'docs',
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: [
      '@reduxjs/toolkit',
      'react-redux',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ],
    force: true
  }
})
