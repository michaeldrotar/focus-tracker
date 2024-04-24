import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'
import { OtherFocusTracker } from './OtherFocusTracker'
import { createFocusTracker } from './internal/createFocusTracker'

export function createOtherFocusTracker(
  initialConfiguration?: Partial<FocusTrackerConfiguration>,
): OtherFocusTracker {
  return createFocusTracker(initialConfiguration)
}
