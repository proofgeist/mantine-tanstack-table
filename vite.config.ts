import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from "vite-plugin-dts";
import external from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "rhf-mantine",
      formats: ["es", "umd"],
      fileName: (format) => `rhf-mantine.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
      plugins: [
        external(),
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: true,
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  },
});
