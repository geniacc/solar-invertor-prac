import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
  }

  // For custom domain (zuice.in) use root base to avoid subpath issues
  if (command !== 'serve') {
    config.base = '/'
  }

  return config
})
