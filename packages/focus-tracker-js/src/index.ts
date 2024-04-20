import { register, unregister } from './registrations'

const focusTracker = {
  register,
  unregister,
  // watch: (selector: string, options: { style: { color: string } }) => {},
  // unwatch: (selector: string) => {},
}

declare global {
  interface Window {
    focusTracker?: typeof focusTracker
  }
}

if (typeof window !== 'undefined' && !window.focusTracker) {
  window.focusTracker = focusTracker
}

export { focusTracker }
export type { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'
