import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: 0,

  use: {
    screenshot: "on",
    video: "on",
    trace: "retain-on-failure",
  },
  reporter: [["html", { open: "never" }]],
});
