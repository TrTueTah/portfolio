import locatorBabelJsx from "@locator/babel-jsx";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    react(),
    // LocatorJS: add source-location data ids to JSX (dev server only)
    command === "serve" &&
      babel({
        include: /\/src\/.*\.[jt]sx$/,
        plugins: [locatorBabelJsx],
      }),
  ],
}));
