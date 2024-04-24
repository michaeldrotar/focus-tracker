import { UserFocusTracker } from './FocusTracker'
import { createFocusTrackerIndicator } from './createFocusTrackerIndicator'
import { addTracker } from './addTracker'
import { getElementConfiguration } from './getElementConfiguration'
import { getFocusedElement } from './getFocusedElement'
import { removeTracker } from './removeTracker'
import { updateTracker } from './updateTracker'

export function createUserFocusTracker(): UserFocusTracker {
  let isKeyboard = false
  let internalTarget: HTMLElement | undefined

  function mouseKeyboardEventHandler(event: KeyboardEvent | MouseEvent) {
    if ('key' in event) {
      if (event.key === 'Tab') isKeyboard = true
    } else {
      isKeyboard = false
    }
  }

  function addDocumentEventHandlers() {
    document.addEventListener('keydown', mouseKeyboardEventHandler)
    document.addEventListener('mousedown', mouseKeyboardEventHandler)
  }

  function removeDocumentEventHandlers() {
    document.removeEventListener('keydown', mouseKeyboardEventHandler)
    document.removeEventListener('mousedown', mouseKeyboardEventHandler)
  }

  const { containerEl, indicatorEl } = createFocusTrackerIndicator()
  document.body.appendChild(containerEl)

  addDocumentEventHandlers()

  const focusTracker: UserFocusTracker = {
    containerEl,
    indicatorEl,

    update() {
      if (!isKeyboard) {
        removeTracker(focusTracker)
        internalTarget = undefined
      }

      const focusedElement = getFocusedElement()
      if (!focusedElement) {
        if (internalTarget) {
          removeTracker(focusTracker)
          internalTarget = undefined
        }
      } else {
        const response = getElementConfiguration(focusedElement)
        if (!response) {
          if (internalTarget) {
            removeTracker(focusTracker)
            internalTarget = undefined
          }
        } else {
          const { configuration, target } = response
          if (!internalTarget) {
            addTracker(focusTracker, target, configuration)
            internalTarget = target
          } else {
            updateTracker(focusTracker, target, configuration)
            if (internalTarget !== target) {
              internalTarget = target
            }
          }
        }
      }
    },
    destroy() {
      removeDocumentEventHandlers()
    },
  }

  return focusTracker
}
