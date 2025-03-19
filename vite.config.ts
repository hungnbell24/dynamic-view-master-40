
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { RENDER_FILE_NAME } from "./src/RenderConfig";

export default defineConfig(({ mode }) => {
  const isComponentBuild = process.env.VITE_BUILD_MODE === "component";
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: isComponentBuild
        ? {
          entry: "./src/ReactWebComponent.tsx",
          name: RENDER_FILE_NAME,
          formats: ["umd"],
        } : undefined,
      rollupOptions: isComponentBuild
        ? {
          output: {
            assetFileNames: "[name].[ext]",
            entryFileNames: "[name].js",
            inlineDynamicImports: true,
          },
        } : undefined,
      outDir: 'dist',//isComponentBuild ? 'D:\\t3\\client\\src\\assets\\microfrontend\\omron' : 'dist',
      cssCodeSplit: false,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    }
  };
});
