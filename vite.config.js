import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 💡 CRITICAL: Sets the base path for assets
  base: "/",

  // 💡 Ensures the output goes to the 'docs' folder for GitHub Pages
  build: {
    outDir: 'docs',
  }
})