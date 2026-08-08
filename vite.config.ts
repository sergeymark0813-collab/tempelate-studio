import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    reportCompressedSize: false,
  },
  server: {
    // Vite doesn't read PORT on its own; honour it so an externally assigned
    // port (e.g. when 5174 is already taken) is actually used.
    port: Number(process.env.PORT) || 5174,
  },
});
