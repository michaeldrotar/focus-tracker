import {
  disableDefaultFocusStyles,
  reenableDefaultFocusStyles,
} from './defaultFocusStyles'
import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'

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
  unregister(element)
  disableDefaultFocusStyles(element)
  registrations.push({ element, configuration })
}

/**
 * Unregisters a single element.
 */
export function unregister(element: HTMLElement) {
  for (let index = 0; index < registrations.length; index++) {
    const registration = registrations[index]
    if (registration && registration.element === element) {
      reenableDefaultFocusStyles(element)
      registrations.splice(index, 1)
      break
    }
  }
}
