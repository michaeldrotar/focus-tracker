import { getStackingParent } from './getStackingParent'
import { FocusTrackerConfiguration } from '../index'
import { applyConfiguration } from './configurations'
import { disableTransitions, enableTransitions } from './transitions'
import { assignRect, getElementRect } from './rects'
import { assignTransform } from './transforms'
import { FocusTracker } from './FocusTracker'

export function addTracker(
  focusTracker: FocusTracker,
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) {
  const { indicatorEl, containerEl } = focusTracker
  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  assignRect(containerEl, parentRect, { addWindow: true })
  assignRect(indicatorEl, targetRect, {
    relativeTo: parentRect,
    transform: 'scale(2)',
  })

  applyConfiguration(indicatorEl, configuration)

  indicatorEl.style.opacity = '0'
  // assignTransform(tracker, { scale: '2' })
  disableTransitions(focusTracker)

  window.requestAnimationFrame(() => {
    enableTransitions(focusTracker)
    indicatorEl.style.opacity = '1'
    assignTransform(indicatorEl, { scale: '1' })
  })
}
