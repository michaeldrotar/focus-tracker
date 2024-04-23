import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'

function toUnit(value: string | number, defaultUnit: string): string {
  return typeof value === 'string' ? value : `${value}${defaultUnit}`
}

function getOutline(configuration: FocusTrackerConfiguration): string {
  const thickness = toUnit(configuration.thickness, 'px')
  const outline = `${thickness} solid ${configuration.color}`
  if (outline === '1px solid -webkit-focus-ring-color') {
    return '1px auto -webkit-focus-ring-color'
  }
  return outline
}

export function applyConfiguration(
  element: HTMLElement,
  configuration: FocusTrackerConfiguration,
) {
  element.style.boxShadow = configuration.boxShadow
  element.style.color = configuration.color
  element.style.outline = getOutline(configuration)
  element.style.outlineOffset = toUnit(configuration.offset, 'px')
}
