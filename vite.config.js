// vite.config.js — Cloudflare Pages build
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist", // Cloudflare Pages default; was "docs" for GitHub Pages
  },
});

// NOTE: the old GitHub-Pages "copy-blogs" plugin is no longer needed.
// Vite automatically copies everything in /public (including /public/blogs/*.html)
// into /dist, so your generated articles still ship at /blogs/<slug>.html.