import {
  disableDefaultFocusStyles,
  reenableDefaultFocusStyles,
} from './defaultFocusStyles'
import { startTracking } from './startTracking'
import { stopTracking } from './stopTracking'
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
  unregister(element)
  disableDefaultFocusStyles(element)
  registrations.push({ element, configuration })
  if (registrations.length === 1) startTracking()
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
  if (registrations.length === 0) stopTracking()
}
