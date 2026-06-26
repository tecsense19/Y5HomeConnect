import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    TanStackRouterVite(),
    viteReact(),
  ];

  return {
    plugins,
    css: {
      transformer: "lightningcss",
    },
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: {
      host: "::",
      port: 8080,
      allowedHosts: [
        'poppy-sullen-overwrite.ngrok-free.dev'
      ],
      proxy: {
        '/image-proxy': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/image-proxy/, '')
        },
        '/live-proxy': {
          target: 'https://y5homecrm.websitedesign4you.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/live-proxy/, '')
        }
      }
    },
  };
});
