import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 💡 Configuration for GitHub Pages Deployment
  base: "/alwayslivinginspired/",

  build: {
    outDir: 'docs', // Output to 'docs' folder for GitHub Pages
  }
})