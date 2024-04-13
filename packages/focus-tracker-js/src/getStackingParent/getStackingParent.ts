/**
 * Provides the closest parent element that creates a new stacking context
 * (scrolling, position, etc) or the body element.
 */
export function getStackingParent(element: HTMLElement): HTMLElement {
  let parent = element as HTMLElement | null
  while (parent) {
    const styles = getComputedStyle(parent)
    if (styles.position !== 'static' || styles.transform !== 'none') {
      return document.body
    }
    if (parent !== element && styles.overflow !== 'visible') {
      return parent
    }
    parent = parent.parentElement
  }
  return document.body
}
