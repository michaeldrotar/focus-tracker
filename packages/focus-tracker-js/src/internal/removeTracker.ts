import { enableTransitions } from './transitions'
import { assignTransform } from './transforms'
import { FocusTracker } from './FocusTracker'

export function removeTracker(focusTracker: FocusTracker) {
  enableTransitions(focusTracker)
  focusTracker.indicatorEl.style.opacity = '0'
  assignTransform(focusTracker.indicatorEl, { scale: '2' })
}
