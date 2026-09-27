import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Project Pages site: https://daannnyyyy.github.io/devtoolbox/
  base: '/devtoolbox/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
