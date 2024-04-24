import { FocusTracker } from './FocusTracker'

const focusTrackers: FocusTracker[] = []

export const FocusTrackerRegistry = {
  add: (focusTracker: FocusTracker) => {
    if (focusTrackers.includes(focusTracker)) return
    focusTrackers.push(focusTracker)
  },
  remove: (focusTracker: FocusTracker) => {
    const index = focusTrackers.indexOf(focusTracker)
    if (index !== -1) {
      focusTrackers.splice(index, 1)
    }
  },
  forEach: (callback: (focusTracker: FocusTracker) => void) => {
    if (FocusTrackerRegistry.userFocusTracker) {
      callback(FocusTrackerRegistry.userFocusTracker)
    }
    focusTrackers.forEach(callback)
  },
  getCount: () =>
    focusTrackers.length + (FocusTrackerRegistry.userFocusTracker ? 1 : 0),
  userFocusTracker: undefined as FocusTracker | undefined,
}
