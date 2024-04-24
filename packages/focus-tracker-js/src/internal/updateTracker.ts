import { getStackingParent } from './getStackingParent'
import { FocusTrackerConfiguration } from '../index'
import { applyConfiguration } from './configurations'
import { disableTransitions, enableTransitions } from './transitions'
import { assignRect, getElementRect, rectsDiffer } from './rects'
import { FocusTracker } from './FocusTracker'

export function updateTracker(
  focusTracker: FocusTracker,
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) {
  const { indicatorEl, containerEl } = focusTracker
  const { lastConfiguration, lastParentRect, lastTarget, lastTargetRect } =
    focusTracker

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
    assignRect(containerEl, parentRect, { addWindow: true })
  }

  if (targetChanged) {
    enableTransitions(focusTracker)
    assignRect(indicatorEl, targetRect, { relativeTo: parentRect })
  } else if (targetRectChanged) {
    disableTransitions(focusTracker)
    assignRect(indicatorEl, targetRect, { relativeTo: parentRect })
  }

  if (configurationChanged) {
    enableTransitions(focusTracker)
    applyConfiguration(indicatorEl, configuration)
  }

  focusTracker.lastParentRect = parentRect
  // lastParent = parent
  focusTracker.lastTargetRect = targetRect
  focusTracker.lastTarget = target
  focusTracker.lastConfiguration = configuration
}
