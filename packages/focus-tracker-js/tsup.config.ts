import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: [
    'src/index.ts',
    'src/FocusTrackerConfiguration.ts',
    'src/registerFocusTrackerConfiguration.ts',
    'src/unregisterFocusTrackerConfiguration.ts',
    'src/startUserFocusTracker.ts',
    'src/stopUserFocusTracker.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: [],
  ...options,
}))
