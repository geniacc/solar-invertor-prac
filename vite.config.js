import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  }

  // For custom domain (zuice.in) use root base to avoid subpath issues
  if (command !== 'serve') {
    config.base = '/'
  }

  return config
})
