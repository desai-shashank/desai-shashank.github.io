import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // IMPORTANT: replace 'REPO_NAME' below with your actual GitHub repo name.
  // e.g. if your repo is github.com/shashank/portfolio, use '/portfolio/'
  // If you're deploying to a <username>.github.io repo (root-level site)
  // or a custom domain, set base to '/' instead.
  base: '/Portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
