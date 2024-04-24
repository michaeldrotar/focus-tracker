import { Engine } from './internal/Engine'
import { FocusTrackerRegistry } from './internal/FocusTrackerRegistry'
import { createUserFocusTracker } from './internal/createUserFocusTracker'

export function startUserFocusTracker() {
  if (!FocusTrackerRegistry.userFocusTracker) {
    FocusTrackerRegistry.userFocusTracker = createUserFocusTracker()
    Engine.start()
  }
}
