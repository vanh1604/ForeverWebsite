import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    allowedHosts: "all",
  },
  build: {
    rollupOptions: {
      external: ["react-toastify"], // Keep only if you truly need react-toastify as external
    },
  },
});
