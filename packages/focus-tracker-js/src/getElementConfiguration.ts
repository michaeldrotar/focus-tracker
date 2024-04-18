import { FocusTrackerConfiguration } from '.'
import { baseConfiguration } from './baseConfiguration'
import { registrations } from './registrations'

export function getElementConfiguration(
  element: HTMLElement,
): FocusTrackerConfiguration | undefined {
  let hasRegistration = false
  let partialConfiguration: Partial<FocusTrackerConfiguration> = {}
  // find self or parent element that has data-focus-tracker--parent attribute defined
  let currentElement: HTMLElement | null = element
  while (currentElement) {
    const registration = registrations.find(
      (reg) => reg.element === currentElement,
    )
    if (registration) {
      hasRegistration = true
      if (registration.configuration) {
        if (
          !partialConfiguration.target &&
          registration.configuration.target === 'self'
        ) {
          partialConfiguration.target = currentElement
        }
        for (const [key, value] of Object.entries(registration.configuration)) {
          // @ts-ignore
          if (value !== undefined && partialConfiguration[key] === undefined) {
            // @ts-ignore
            partialConfiguration[key] = value
          }
        }
      }
    }
    currentElement = currentElement.parentElement
  }
  if (!hasRegistration) return undefined
  return { ...baseConfiguration, ...partialConfiguration }
}
