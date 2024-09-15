import { config } from 'dotenv';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

const env = config({ path: '.env.test' });
export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts', '**/*.spec.ts'],
    globals: true,
    root: './',
    env: env.parsed,
  },
  plugins: [swc.vite()],
});
