import { FocusTrackerRegistry } from './FocusTrackerRegistry'

let loopId = 0

export const Engine = {
  loopId: 0,

  start: () => {
    if (loopId) return

    function loop() {
      FocusTrackerRegistry.forEach((focusTracker) => {
        focusTracker.update()
      })
      loopId = requestAnimationFrame(loop)
    }

    loopId = requestAnimationFrame(loop)
  },

  stop: () => {
    if (!loopId) return

    cancelAnimationFrame(loopId)
    loopId = 0
  },

  isNeeded: () => {
    return FocusTrackerRegistry.getCount() > 0
  },
}
