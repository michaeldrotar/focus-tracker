import { getFocusedElement } from '../getFocusedElement/getFocusedElement'

export function getVisuallyFocusedElement() {
  const focusedElement = getFocusedElement()
  if (!focusedElement) return undefined
  // find self or parent element that has data-focus-tracker--parent attribute defined
  let parent: HTMLElement | null = focusedElement
  while (parent) {
    if (parent.hasAttribute('data-focus-tracker--parent')) return parent
    parent = parent.parentElement
  }
  return focusedElement
}
