// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, readdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-blogs',
      closeBundle() {
        // Ensure the blogs directory exists in docs
        const blogsDir = resolve(__dirname, 'docs/blogs')
        mkdirSync(blogsDir, { recursive: true })

        // Copy all HTML files from public/blogs to docs/blogs
        const sourceDir = resolve(__dirname, 'public/blogs')
        const files = readdirSync(sourceDir)

        files.forEach(file => {
          if (file.endsWith('.html')) {
            copyFileSync(
              resolve(sourceDir, file),
              resolve(blogsDir, file)
            )
            console.log(`Copied ${file} to docs/blogs/`)
          }
        })
      }
    }
  ],
  build: {
    outDir: 'docs',
  }
})