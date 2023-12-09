import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  
  build: {manifest: true},
  base: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  define: {
    'import.meta.env.VITE_APP_STATIC_PATH': JSON.stringify(process.env.NODE_ENV === 'production' ? '/static' : ''),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

