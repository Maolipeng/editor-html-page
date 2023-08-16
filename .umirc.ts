import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/editor", component: "Editor" },
  ],

  npmClient: "pnpm",
  plugins: ["@umijs/plugins/dist/antd", "@umijs/plugins/dist/tailwindcss"],
  antd: {},
  tailwindcss: {},
});
