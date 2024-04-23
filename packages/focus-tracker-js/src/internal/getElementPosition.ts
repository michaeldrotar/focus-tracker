export function getElementPosition(element: HTMLElement) {
  // const position = { x: 0, y: 0 }
  // while (element && element !== document.body) {
  //   position.x += element.offsetLeft
  //   position.y += element.offsetTop
  //   element = element.offsetParent as HTMLElement
  // }
  // NOTE: offsetLeft/Top rounds to the nearest integer so can be off slightly,
  // may need to convert to use bounding rect but need scroll offsets
  const rect = element.getBoundingClientRect()
  return { x: rect.x + window.scrollX, y: rect.y + window.scrollY }
  // return position
}
