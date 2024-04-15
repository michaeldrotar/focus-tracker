import { FocusTrackerConfiguration } from '.'
import { baseConfiguration } from './baseConfiguration'
import { registrations } from './registrations'

export function getElementConfiguration(
  element: HTMLElement,
): FocusTrackerConfiguration | undefined {
  let hasConfiguration = false
  let partialConfiguration: Partial<FocusTrackerConfiguration> = {}
  // find self or parent element that has data-focus-tracker--parent attribute defined
  let currentElement: HTMLElement | null = element
  while (currentElement) {
    const registration = registrations.find(
      (reg) => reg.element === currentElement,
    )
    if (registration) {
      hasConfiguration = true
      if (registration.configuration) {
        if (
          !partialConfiguration.target &&
          registration.configuration.target === 'self'
        ) {
          partialConfiguration.target = currentElement
        }
        partialConfiguration = {
          ...registration.configuration,
          ...partialConfiguration,
        }
      }
    }
    currentElement = currentElement.parentElement
  }
  if (!hasConfiguration) return undefined
  return { ...baseConfiguration, ...partialConfiguration }
}
