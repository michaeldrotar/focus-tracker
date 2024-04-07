export function getFocusedElement() {
  const activeElement = document.activeElement
  if (activeElement === document.body) return undefined
  if (!(activeElement instanceof HTMLElement)) return undefined
  return activeElement
}
