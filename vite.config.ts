import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Дозволяє використовувати @/ як src/ (відповідає paths у tsconfig.json)
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
