import { internalState } from './internalState'

export function mouseKeyboardEventHandler(event: KeyboardEvent | MouseEvent) {
  const wasKeyboard = internalState.isKeyboard
  if ('key' in event) {
    if (event.key === 'Tab') internalState.isKeyboard = true
  } else {
    internalState.isKeyboard = false
  }
  if (wasKeyboard !== internalState.isKeyboard) {
    if (internalState.isKeyboard) {
      document.documentElement.classList.add('focus-tracker-visible')
    } else {
      document.documentElement.classList.remove('focus-tracker-visible')
    }
  }
}

export function addDocumentEventHandlers() {
  document.addEventListener('keydown', mouseKeyboardEventHandler)
  document.addEventListener('mousedown', mouseKeyboardEventHandler)
}

export function removeDocumentEventHandlers() {
  document.removeEventListener('keydown', mouseKeyboardEventHandler)
  document.removeEventListener('mousedown', mouseKeyboardEventHandler)
}
