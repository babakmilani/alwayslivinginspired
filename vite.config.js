// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If you are using React

export default defineConfig({
  // This tells Vite that all public assets (like your /blogs folder) 
  // and links should be prefixed with '/docs/'.
  base: '/docs/',
  plugins: [react()],
});