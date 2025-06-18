import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./src/tests/setup.ts"],
    hookTimeout: 30000,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
