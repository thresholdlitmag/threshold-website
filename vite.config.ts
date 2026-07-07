import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Set VITE_BASE when deploying under a subpath (e.g. GitHub Pages).
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
});
