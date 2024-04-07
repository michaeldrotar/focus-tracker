export { getFocusedElement } from './getFocusedElement/getFocusedElement'

/*
  focusTracker.register(document.body, { attrPrefix: 'data-focus-tracker'})
  focusTracker.register('body', { attrPrefix: 'data-focus-tracker'})
  focusTracker.watch('button', { style: { color: 'red' } })
  focusTracker.start()
*/

export const focusTracker = {
  register: (el: HTMLElement | string, options: { attrPrefix: string }) => {},
  watch: (selector: string, options: { style: { color: string } }) => {},
  start: () => {},
}

if (typeof window !== 'undefined' && !window.focusTracker) {
  window.focusTracker = focusTracker
}
