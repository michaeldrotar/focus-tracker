import { internalState } from './internalState'
import { enableTransitions } from './transitions'
import { assignTransform } from './transforms'

export function removeTracker() {
  const tracker = internalState.indicatorEl
  if (!tracker) return

  enableTransitions()
  tracker.style.opacity = '0'
  assignTransform(tracker, { scale: '2' })
}
