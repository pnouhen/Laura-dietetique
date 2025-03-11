import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet d'écouter sur toutes les interfaces réseau
    port: 5175,       // Le port où ton app est accessible
  }
})
