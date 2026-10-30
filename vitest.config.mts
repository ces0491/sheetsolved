import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      // `fileURLToPath` rather than `.pathname`, which would leave the spaces
      // in this repo's OneDrive path percent-encoded.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
