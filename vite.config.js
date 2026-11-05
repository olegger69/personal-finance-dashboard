import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Имя вашего репозитория обязательно со слэшами в начале и в конце
  base: '/personal-finance-dashboard/',
})