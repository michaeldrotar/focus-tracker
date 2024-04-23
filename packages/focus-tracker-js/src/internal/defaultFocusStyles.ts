function upsertStyleElement() {
  const existingStyleElement = document.querySelector(
    '[data-focus-tracker-disable-default-focus-styles]',
  )
  if (existingStyleElement) return

  const styleElement = document.createElement('style')
  styleElement.setAttribute(
    'data-focus-tracker-disable-default-focus-styles',
    '',
  )
  styleElement.textContent = `
    [data-focus-tracker-disable-default-focus]:focus,
    [data-focus-tracker-disable-default-focus]:focus-visible,
    [data-focus-tracker-disable-default-focus] *:focus,
    [data-focus-tracker-disable-default-focus] *:focus-visible {
      outline: none !important;
    }
  `
  document.head.appendChild(styleElement)
}

/**
 * Given an element, disables default focus styles for its children.
 * Defaults to document.body.
 */
export function disableDefaultFocusStyles(element?: HTMLElement) {
  upsertStyleElement()
  if (!element) element = document.body
  element.setAttribute('data-focus-tracker-disable-default-focus', '')
}

/**
 * Removes previously added style overrides to reenable default focus styles.
 * Defaults to document.body.
 */
export function reenableDefaultFocusStyles(element?: HTMLElement) {
  if (!element) element = document.body
  element.removeAttribute('data-focus-tracker-disable-default-focus')
}
