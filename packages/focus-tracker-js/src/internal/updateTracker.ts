import { internalState } from './internalState'
import { getStackingParent } from './getStackingParent'
import { FocusTrackerConfiguration } from '../index'
import { applyConfiguration } from './configurations'
import { disableTransitions, enableTransitions } from './transitions'
import { Rect, assignRect, getElementRect, rectsDiffer } from './rects'

let lastTarget: HTMLElement | undefined
// let lastParent: HTMLElement | undefined
let lastTargetRect: Rect | undefined
let lastParentRect: Rect | undefined
let lastConfiguration: FocusTrackerConfiguration | undefined

export function updateTracker(
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) {
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
