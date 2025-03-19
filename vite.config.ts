import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { resolve } from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
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
      // alias: {
      //   "@entry": isComponentBuild
      //     ? resolve(__dirname, "src/ReactWebComponent.ts") // Web Component
      //     : resolve(__dirname, "src/main.ts"), // React App bình thường
      // },
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },


    build: {
      lib: isComponentBuild
        ? {
          entry: "./src/ReactWebComponent.tsx",
          name: "ReactWebComponent",
          fileName: (format) => `react-web-component.${format}.js`,
          formats: ["umd"],
        } : undefined,
      rollupOptions: isComponentBuild
        ? {
          output: {
            assetFileNames: "[name].[ext]",
            entryFileNames: "[name].js",
          },
        } : undefined,
      outDir: isComponentBuild ? 'D:\\t3\\client\\src\\assets\\microfrontend\\omron' : 'dist'
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    }

  };
});
