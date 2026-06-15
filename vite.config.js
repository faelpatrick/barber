import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: 'https://barber.faelpatrick.com/',
  plugins: [vue()],
  // url vue vite em producao na hostinger é: https://barber.faelpatrick.com/
  
  
})
