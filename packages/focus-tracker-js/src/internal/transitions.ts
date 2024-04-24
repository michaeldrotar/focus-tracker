import { FocusTracker } from './FocusTracker'

export function disableTransitions(focusTracker: FocusTracker) {
  const tracker = focusTracker.indicatorEl
  const container = focusTracker.containerEl
  tracker.style.transition = 'none'
  container.style.transition = 'none'
}

export function enableTransitions(focusTracker: FocusTracker) {
  const tracker = focusTracker.indicatorEl
  const container = focusTracker.containerEl
  tracker.style.transition = 'ease-in-out all 200ms'
  container.style.transition = 'ease-in-out all 200ms'
}
