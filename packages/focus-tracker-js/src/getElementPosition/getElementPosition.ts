function getElementPosition(element: HTMLElement) {
  const position = { x: 0, y: 0 }
  while (element && element !== document.body) {
    position.x += element.offsetLeft
    position.y += element.offsetTop
    element = element.offsetParent as HTMLElement
  }
  return position
}
