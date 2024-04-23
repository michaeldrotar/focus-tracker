import { internalState } from './internalState'
import { addDocumentEventHandlers } from './events'
import { createFocusTrackerIndicator } from './createFocusTrackerIndicator'
import { updateFocus } from './updateFocus'

export function startTracking() {
  if (internalState.started) return

  if (!internalState.indicatorEl) {
    const { containerEl, indicatorEl } = createFocusTrackerIndicator()
    internalState.containerEl = containerEl
    internalState.indicatorEl = indicatorEl
    document.body.appendChild(internalState.containerEl)
  }

  const loop = () => {
    updateFocus()
    internalState.loopId = requestAnimationFrame(loop)
  }
  loop()

  addDocumentEventHandlers()

  internalState.started = true
}
