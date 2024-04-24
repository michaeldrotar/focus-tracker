import { register, unregister } from './internal/registrations'
import { startUserFocusTracker } from './startUserFocusTracker'
import { stopUserFocusTracker } from './stopUserFocusTracker'

const focusTracker = {
  register,
  unregister,
  // watch: (selector: string, options: { style: { color: string } }) => {},
  // unwatch: (selector: string) => {},
  start: startUserFocusTracker,
  stop: stopUserFocusTracker,
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
export type { FocusTrackerConfiguration } from './internal/FocusTrackerConfiguration'
export { startUserFocusTracker }
export { stopUserFocusTracker }
