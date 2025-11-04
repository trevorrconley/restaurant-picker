// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // bind to all interfaces
    port: 3000,            // container port
    strictPort: true,      // fail if port is in use
    hmr: {
      host: 'localhost',   // tells Vite HMR to use host machine
      port: 3000,
    },
  },
})