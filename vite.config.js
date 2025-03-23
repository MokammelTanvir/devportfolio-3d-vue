import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [vue()],
    base: command === 'serve' ? '/' : '/devportfolio-3d-vue/', // Use root path for dev, subfolder for production
  }
})
