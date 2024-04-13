import { FocusTrackerConfiguration } from '..'
import { getFocusedElement } from '../getFocusedElement/getFocusedElement'

export function getElementConfiguration(element: HTMLElement) {
  const configuration: Partial<FocusTrackerConfiguration> = {}
  // find self or parent element that has data-focus-tracker--parent attribute defined
  let currentElement: HTMLElement | null = element
  while (currentElement) {
    if (currentElement.hasAttribute('data-focus-tracker--class')) {
      configuration.class +=
        ' ' + currentElement.getAttribute('data-focus-tracker--class')
    }
    currentElement = currentElement.parentElement
  }
  return configuration
}
