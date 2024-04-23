import { FocusTrackerConfiguration } from '..'
import { baseConfiguration } from './baseConfiguration'
import { registrations } from './registrations'

export function getElementConfiguration(
  element: HTMLElement,
):
  | { configuration: FocusTrackerConfiguration; target: HTMLElement }
  | undefined {
  let hasRegistration = false
  let partialConfiguration: Partial<FocusTrackerConfiguration> = {}
  let target: HTMLElement | undefined
  // find self or parent element that has data-focus-tracker--parent attribute defined
  let currentElement: HTMLElement | null = element
  while (currentElement) {
    const registration = registrations.find(
      (reg) => reg.element === currentElement,
    )
    if (registration) {
      hasRegistration = true
      if (registration.configuration) {
        if (!target) {
          if (registration.configuration.target === 'self')
            target = currentElement
          else if (registration.configuration.target === 'target')
            target = element
          else if (registration.configuration.target instanceof HTMLElement)
            target = registration.configuration.target
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
  const configuration = { ...baseConfiguration, ...partialConfiguration }
  if (!target) target = element
  return { configuration, target }
}
