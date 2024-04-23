export type Rect = {
  x: number
  y: number
  width: number
  height: number
  radius: string
}

export function getElementRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    radius: style.borderRadius,
  }
}

export function rectsDiffer(rectA: Rect, rectB: Rect) {
  return (
    rectA.x !== rectB.x ||
    rectA.y !== rectB.y ||
    rectA.width !== rectB.width ||
    rectA.height !== rectB.height ||
    rectA.radius !== rectB.radius
  )
}

export function assignRect(
  element: HTMLElement,
  rect: Rect,
  {
    addWindow,
    relativeTo,
    transform,
  }: { addWindow?: boolean; relativeTo?: Rect; transform?: string } = {},
) {
  const x =
    rect.x + (addWindow ? window.scrollX : 0) - (relativeTo ? relativeTo.x : 0)
  const y =
    rect.y + (addWindow ? window.scrollY : 0) - (relativeTo ? relativeTo.y : 0)
  element.style.left = `0`
  element.style.top = `0`
  element.style.transform = `translate(${x}px, ${y}px) ${transform || ''}`
  element.style.width = `${rect.width}px`
  element.style.height = `${rect.height}px`
  element.style.borderRadius = rect.radius
}
