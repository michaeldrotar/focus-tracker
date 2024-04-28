/**
 * Creates an indicator element that can be moved and styled to visually show focus.
 *
 * Also creates a container element that can be used to clip the indicator element.
 */
export function createFocusTrackerIndicator() {
  const containerEl = document.createElement('div')
  containerEl.style.pointerEvents = 'none'
  containerEl.style.position = 'absolute'
  containerEl.style.overflow = 'hidden'
  containerEl.style.transition = 'ease-in-out all 200ms'
  containerEl.style.zIndex = '999999' // TODO: make this configurable

  const indicatorEl = document.createElement('div')
  indicatorEl.style.pointerEvents = 'none'
  indicatorEl.style.position = 'absolute'

  containerEl.appendChild(indicatorEl)

  return { containerEl, indicatorEl }
}
