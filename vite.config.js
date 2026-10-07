import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base is '/' for Vercel/Netlify. For GitHub Pages project sites set base: '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
