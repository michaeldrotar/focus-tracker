import { internalState } from './internalState'

export function disableTransitions() {
  const tracker = internalState.indicatorEl
  const container = internalState.containerEl
  if (!tracker || !container) return
  tracker.style.transition = 'none'
  container.style.transition = 'none'
}

export function enableTransitions() {
  const tracker = internalState.indicatorEl
  const container = internalState.containerEl
  if (!tracker || !container) return
  tracker.style.transition = 'ease-in-out all 200ms'
  container.style.transition = 'ease-in-out all 200ms'
}
