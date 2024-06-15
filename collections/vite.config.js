import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
    port: process.env.PORT || 5000, // Default to port 3000 if PORT is not set
  },
  preview: {
    port: process.env.PORT || 5000, // Ensure the preview server uses the correct port
  },
  plugins: [react()],
});
