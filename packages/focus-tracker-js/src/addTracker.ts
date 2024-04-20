import { internalState } from './internalState'
import { getStackingParent } from './getStackingParent/getStackingParent'
import { FocusTrackerConfiguration } from './index'
import { applyConfiguration } from './configurations'
import { disableTransitions, enableTransitions } from './transitions'
import { assignRect, getElementRect } from './rects'
import { assignTransform } from './transforms'

export function addTracker(
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) {
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
