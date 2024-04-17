export type Transform = { x?: string; y?: string; scale?: string }

export function getTransform(element: HTMLElement): Transform {
  const style = getComputedStyle(element)
  const transformStrings = style.transform.match(/\w+\([^\)]+\)/g)
  if (!transformStrings) return {}
  return transformStrings.reduce((transform, value) => {
    const [key, ...values] = value.split(/\(|,|\)/)
    if (key === 'matrix') {
      // only need scale and translate
      transform.scale = values[0]
      transform.x = values[4]?.trim() + 'px'
      transform.y = values[5]?.trim() + 'px'
    } else if (key === 'translate') {
      transform.x = values[0]
      transform.y = values[1]
    } else if (key === 'scale') {
      transform.scale = values[0]
    }
    return transform
  }, {} as Transform)
}

export function setTransform(element: HTMLElement, transform: Transform) {
  const transforms = []
  if (transform.x || transform.y) {
    transforms.push(`translate(${transform.x ?? 0}, ${transform.y ?? 0})`)
  }
  if (transform.scale) {
    transforms.push(`scale(${transform.scale})`)
  }
  element.style.transform = transforms.join(' ')
}

export function assignTransform(element: HTMLElement, transform: Transform) {
  const currentTransform = getTransform(element)
  setTransform(element, { ...currentTransform, ...transform })
}
