import { internalState } from './internalState'
import { removeDocumentEventHandlers } from './events'

export function stopTracking() {
  if (!internalState.started) return
  if (internalState.loopId) {
    cancelAnimationFrame(internalState.loopId)
    internalState.loopId = 0
  }
  removeDocumentEventHandlers()
  internalState.started = false
}
