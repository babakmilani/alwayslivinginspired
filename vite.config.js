// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. ADD THIS BASE PROPERTY
  base: '/docs/',
  plugins: [react()],
})