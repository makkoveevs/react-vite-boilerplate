import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const plugins = [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: true }]]
      }
    }),
    tsconfigPaths()
  ];

  const resolve = {
    alias: {
      src: "/src"
    }
  };

  const build = {
    outDir: "./dist",
    emptyOutDir: true,

    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom/client"],
          vendors: ["axios", "mobx", "mobx-react-lite"],
          "styled-components": ["styled-components"],
          antd: ["antd"]
        }
      }
    }
  };

  return {
    plugins,
    resolve,
    build,

    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true
    //     }
    //   }
    // },

    server: {
      port: 8088,
      proxy: {
        "/api/v1/": {
          target: env.API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, "")
        }
      }
    }
  };
});
