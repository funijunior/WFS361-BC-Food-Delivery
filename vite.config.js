import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Icons are inline React components (src/utils/icons.jsx) — no SVG
// transform plugin required, keeping the build fast and reliable.
// Image assets (.png/.jpg) are handled by Vite's default asset pipeline.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
