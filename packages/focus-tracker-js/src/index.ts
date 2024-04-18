import { internalState } from './internalState'
import { baseConfiguration } from './baseConfiguration'
import { getElementConfiguration } from './getElementConfiguration'
import { getStackingParent } from './getStackingParent/getStackingParent'
import { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'
import { register, unregister } from './registrations'
import { applyConfiguration } from './configurations'
import { addDocumentEventHandlers, removeDocumentEventHandlers } from './events'
import { createFocusTrackerIndicator } from './createFocusTrackerIndicator'
import { disableTransitions, enableTransitions } from './transitions'
import { Rect, assignRect, getElementRect, rectsDiffer } from './rects'
import { assignTransform } from './transforms'
import { getFocusedElement } from './getFocusedElement/getFocusedElement'

/*
  focusTracker.register(document.body, { attrPrefix: 'data-focus-tracker'})
  focusTracker.register('body', { attrPrefix: 'data-focus-tracker'})
  focusTracker.watch('button', { style: { color: 'red' } })
  focusTracker.start()
*/

let lastTarget: HTMLElement | undefined
// let lastParent: HTMLElement | undefined
let lastTargetRect: Rect | undefined
let lastParentRect: Rect | undefined
let lastConfiguration: FocusTrackerConfiguration | undefined

const updateTracker = (
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) => {
  const tracker = internalState.indicatorEl
  const container = internalState.containerEl
  if (!tracker || !container) return

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  const targetChanged = !lastTarget || lastTarget !== target
  const targetRectChanged =
    !lastTargetRect || rectsDiffer(lastTargetRect, targetRect)
  // const parentChanged = !lastParent || lastParent !== parent
  const parentRectChanged =
    !lastParentRect || rectsDiffer(lastParentRect, parentRect)
  const configurationChanged =
    !lastConfiguration || lastConfiguration !== configuration

  if (parentRectChanged) {
    assignRect(container, parentRect, { addWindow: true })
  }

  if (targetChanged) {
    console.log(configuration)
    enableTransitions()
    assignRect(tracker, targetRect, { relativeTo: parentRect })
  } else if (targetRectChanged) {
    disableTransitions()
    assignRect(tracker, targetRect, { relativeTo: parentRect })
  }

  if (configurationChanged) {
    enableTransitions()
    applyConfiguration(tracker, configuration)
  }

  lastParentRect = parentRect
  // lastParent = parent
  lastTargetRect = targetRect
  lastTarget = target
  lastConfiguration = configuration
}

const addTracker = (
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) => {
  const tracker = internalState.indicatorEl
  const container = internalState.containerEl
  if (!tracker || !container) return

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  assignRect(container, parentRect, { addWindow: true })
  assignRect(tracker, targetRect, {
    relativeTo: parentRect,
    transform: 'scale(2)',
  })

  applyConfiguration(tracker, configuration)

  tracker.style.opacity = '0'
  // assignTransform(tracker, { scale: '2' })
  disableTransitions()

  window.requestAnimationFrame(() => {
    enableTransitions()
    tracker.style.opacity = '1'
    assignTransform(tracker, { scale: '1' })
  })
}

const removeTracker = () => {
  const tracker = internalState.indicatorEl
  if (!tracker) return

  enableTransitions()
  tracker.style.opacity = '0'
  assignTransform(tracker, { scale: '2' })
}

const updateFocus = () => {
  if (internalState.isKeyboard) {
    const focusedElement = getFocusedElement()
    if (!focusedElement) {
      if (internalState.target) {
        removeTracker()
        internalState.target = undefined
      }
    } else {
      const response = getElementConfiguration(focusedElement)
      if (!response) {
        if (internalState.target) {
          removeTracker()
          internalState.target = undefined
        }
      } else {
        const { configuration, target } = response
        if (!internalState.target) {
          addTracker(target, configuration)
          internalState.target = target
        } else {
          updateTracker(target, configuration)
          if (internalState.target !== target) {
            internalState.target = target
          }
        }
      }
    }
  } else if (internalState.target) {
    removeTracker()
    internalState.target = undefined
  }
}

const focusTracker = {
  configure: (options: Partial<FocusTrackerConfiguration>) => {
    Object.assign(baseConfiguration, options)
  },
  register,
  unregister,
  // watch: (selector: string, options: { style: { color: string } }) => {},
  // unwatch: (selector: string) => {},
  start: () => {
    if (internalState.started) return

    if (!internalState.indicatorEl) {
      const { containerEl, indicatorEl } = createFocusTrackerIndicator()
      internalState.containerEl = containerEl
      internalState.indicatorEl = indicatorEl
      document.body.appendChild(internalState.containerEl)
    }

    const loop = () => {
      updateFocus()
      internalState.loopId = requestAnimationFrame(loop)
    }
    loop()

    addDocumentEventHandlers()

    internalState.started = true
  },
  stop: () => {
    if (!internalState.started) return
    if (internalState.loopId) {
      cancelAnimationFrame(internalState.loopId)
      internalState.loopId = 0
    }
    removeDocumentEventHandlers()
    internalState.started = false
  },
}

declare global {
  interface Window {
    focusTracker?: typeof focusTracker
  }
}

if (typeof window !== 'undefined' && !window.focusTracker) {
  window.focusTracker = focusTracker
}

export { focusTracker }
export type { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'
