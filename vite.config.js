import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Change this to match your GitHub repository name
  base: '/alwayslivinginspired/',

  build: {
    outDir: 'docs',
  }
})