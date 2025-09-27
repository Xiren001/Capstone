import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
  },
  esbuild: {
    target: "esnext",
  },
});
