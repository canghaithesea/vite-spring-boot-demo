import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 本地开发：把 /api 请求代理到 Spring Boot（8080），避免跨域与写死域名
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})

