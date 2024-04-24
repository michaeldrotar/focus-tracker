import { Engine } from './internal/Engine'
import { FocusTrackerRegistry } from './internal/FocusTrackerRegistry'

export function stopUserFocusTracker() {
  if (FocusTrackerRegistry.userFocusTracker) {
    FocusTrackerRegistry.userFocusTracker.destroy()
    FocusTrackerRegistry.userFocusTracker = undefined
    if (!Engine.isNeeded()) Engine.stop()
  }
}
