import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // For custom domains, use "/" as the base
  base: '/',

  build: {
    outDir: 'docs',
  }
})