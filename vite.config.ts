import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward API calls to the local mail server during development.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  resolve: {
    // Ensure a single copy of React so libraries like @splinetool/react-spline
    // don't trip the "Invalid hook call" (duplicate React) error.
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@splinetool/react-spline', '@splinetool/runtime'],
  },
});
