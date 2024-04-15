import { disableDefaultFocusStyles } from './defaultFocusStyles'
import { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'

export type Registration = {
  element: HTMLElement
  configuration?: Partial<FocusTrackerConfiguration>
}

export const registrations: Registration[] = []

/**
 * Registers a single element with a set configuration.
 */
export function register(
  element: HTMLElement,
  configuration?: Partial<FocusTrackerConfiguration>,
) {
  disableDefaultFocusStyles(element)
  unregister(element)
  registrations.push({ element, configuration })
}

/**
 * Unregisters a single element.
 */
export function unregister(element: HTMLElement) {
  for (let index = 0; index < registrations.length; index++) {
    const registration = registrations[index]
    if (registration && registration.element === element) {
      registrations.splice(index, 1)
      break
    }
  }
}
