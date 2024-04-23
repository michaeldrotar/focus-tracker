import { addTracker } from './addTracker'
import { getElementConfiguration } from './getElementConfiguration'
import { getFocusedElement } from './getFocusedElement'
import { internalState } from './internalState'
import { removeTracker } from './removeTracker'
import { updateTracker } from './updateTracker'

export function updateFocus() {
  if (internalState.isKeyboard) {
    const focusedElement = getFocusedElement()
    if (!focusedElement) {
      if (internalState.target) {
        removeTracker()
        internalState.target = undefined
      }
    } else {
      const response = getElementConfiguration(focusedElement)
      if (!response) {
        if (internalState.target) {
          removeTracker()
          internalState.target = undefined
        }
      } else {
        const { configuration, target } = response
        if (!internalState.target) {
          addTracker(target, configuration)
          internalState.target = target
        } else {
          updateTracker(target, configuration)
          if (internalState.target !== target) {
            internalState.target = target
          }
        }
      }
    }
  } else if (internalState.target) {
    removeTracker()
    internalState.target = undefined
  }
}
