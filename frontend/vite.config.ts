import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, "./src/assets/"),
      '@components': path.resolve(__dirname, "./src/components/"),
      '@redux': path.resolve(__dirname, "./src/redux/"),
      '@screens': path.resolve(__dirname, "./src/screens/"),
      '@type': path.resolve(__dirname, "./src/type/"),
      '@utils': path.resolve(__dirname, "./src/utils/"),
      '@actions': path.resolve(__dirname, "./src/actions/"),
      '@temporaryActions': path.resolve(__dirname, "./src/temporaryActions/"),
    }
  }
})
