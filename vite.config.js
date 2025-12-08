import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ],

  theme: {
    extend: {
      colors: {
        'civix-blue': '#238ae9',
        'civix-blue-dark': '#1e7acc',
        'civix-gray': '#f4f6f8',
        'civix-black': '#242424',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
      },
    },
  },
  
})


