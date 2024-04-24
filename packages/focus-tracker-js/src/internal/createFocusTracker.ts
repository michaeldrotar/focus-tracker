import { OtherFocusTracker } from './FocusTracker'
import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'
import { FocusTrackerRegistry } from './FocusTrackerRegistry'
import { createFocusTrackerIndicator } from './createFocusTrackerIndicator'
import { addTracker } from './addTracker'
import { getElementConfiguration } from './getElementConfiguration'
import { removeTracker } from './removeTracker'
import { updateTracker } from './updateTracker'
import { baseConfiguration } from './baseConfiguration'

export function createFocusTracker(
  initialConfiguration?: Partial<FocusTrackerConfiguration>,
): OtherFocusTracker {
  let focusedElement: HTMLElement | undefined
  let internalTarget: HTMLElement | undefined

  const { containerEl, indicatorEl } = createFocusTrackerIndicator()
  document.body.appendChild(containerEl)

  const focusTracker: OtherFocusTracker = {
    containerEl,
    indicatorEl,
    configuration: {},

    configure(configuration: Partial<FocusTrackerConfiguration>) {
      focusTracker.configuration = { ...configuration }
    },
    blur() {
      focusedElement = undefined
    },
    focus(element) {
      focusedElement = element
    },
    update() {
      if (!focusedElement) {
        if (internalTarget) {
          removeTracker(focusTracker)
          internalTarget = undefined
        }
      } else {
        const response = getElementConfiguration(focusedElement) || {
          configuration: baseConfiguration,
          target: focusedElement,
        }
        const { target } = response
        const configuration = {
          ...response.configuration,
          ...focusTracker.configuration,
        }
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
    },
    destroy() {
      containerEl.remove()
      FocusTrackerRegistry.remove(focusTracker)
    },
  }

  if (initialConfiguration) {
    focusTracker.configure(initialConfiguration)
  }

  FocusTrackerRegistry.add(focusTracker)

  return focusTracker
}
