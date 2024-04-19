import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: ['src/index.ts', 'src/FocusTrackerRegistration.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: ['react'],
  ...options,
}))
