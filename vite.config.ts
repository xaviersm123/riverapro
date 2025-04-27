import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression() // Add the plugin here
    // You can add options inside the parentheses if needed, e.g., viteCompression({ algorithm: 'gzip' })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});