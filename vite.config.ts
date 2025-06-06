import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/moogboard/",
  plugins: [
    remix({
      basename: "/moogboard/",
      ssr: false,
    }),
    tsconfigPaths(),
  ],
});
