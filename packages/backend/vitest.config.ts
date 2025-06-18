import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',    
    setupFiles: ['./src/tests/setup.ts'],
    coverage: { reporter: ['text', 'json', 'html'] }
  },
});
