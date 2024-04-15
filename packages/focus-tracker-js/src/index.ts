import { internalState } from './internalState'
import { baseConfiguration } from './baseConfiguration'
import { getElementConfiguration } from './getElementConfiguration'
import { getStackingParent } from './getStackingParent/getStackingParent'
import { getVisuallyFocusedElement } from './getVisuallyFocusedElement/getVisuallyFocusedElement'
import { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'
import { register, unregister } from './registrations'

import { applyConfiguration } from './configurations'

/*
  focusTracker.register(document.body, { attrPrefix: 'data-focus-tracker'})
  focusTracker.register('body', { attrPrefix: 'data-focus-tracker'})
  focusTracker.watch('button', { style: { color: 'red' } })
  focusTracker.start()
*/

const listener = (event: KeyboardEvent | MouseEvent) => {
  const wasKeyboard = internalState.isKeyboard
  if ('key' in event) {
    if (event.key === 'Tab') internalState.isKeyboard = true
  } else {
    internalState.isKeyboard = false
  }
  if (wasKeyboard !== internalState.isKeyboard) {
    if (internalState.isKeyboard) {
      document.documentElement.classList.add('focus-tracker-visible')
    } else {
      document.documentElement.classList.remove('focus-tracker-visible')
    }
  }
}

const disableTransition = () => {
  const tracker = internalState.focusTrackerEl
  const container = internalState.containerEl
  if (!tracker || !container) return
  tracker.style.transition = 'none'
  container.style.transition = 'none'
}
const enableTransition = () => {
  const tracker = internalState.focusTrackerEl
  const container = internalState.containerEl
  if (!tracker || !container) return
  tracker.style.transition = 'ease-in-out all 200ms'
  container.style.transition = 'ease-in-out all 200ms'
}

type Rect = {
  x: number
  y: number
  width: number
  height: number
  radius: string
}
const getElementRect = (element: HTMLElement): Rect => {
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

const rectsDiffer = (rectA: Rect, rectB: Rect) => {
  return (
    rectA.x !== rectB.x ||
    rectA.y !== rectB.y ||
    rectA.width !== rectB.width ||
    rectA.height !== rectB.height ||
    rectA.radius !== rectB.radius
  )
}

type Transform = { x?: string; y?: string; scale?: string }

const getTransform = (element: HTMLElement): Transform => {
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

const setTransform = (element: HTMLElement, transform: Transform) => {
  const transforms = []
  if (transform.x || transform.y) {
    transforms.push(`translate(${transform.x ?? 0}, ${transform.y ?? 0})`)
  }
  if (transform.scale) {
    transforms.push(`scale(${transform.scale})`)
  }
  element.style.transform = transforms.join(' ')
}

const assignTransform = (element: HTMLElement, transform: Transform) => {
  const currentTransform = getTransform(element)
  setTransform(element, { ...currentTransform, ...transform })
}

const assignRect = (
  element: HTMLElement,
  rect: Rect,
  {
    addWindow,
    relativeTo,
    transform,
  }: { addWindow?: boolean; relativeTo?: Rect; transform?: string } = {},
) => {
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

let lastTarget: HTMLElement | undefined
// let lastParent: HTMLElement | undefined
let lastTargetRect: Rect | undefined
let lastParentRect: Rect | undefined

const updateTracker = (
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) => {
  const tracker = internalState.focusTrackerEl
  const container = internalState.containerEl
  if (!tracker || !container) return

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  const targetChanged = !lastTarget || lastTarget !== target
  const targetRectChanged =
    !lastTargetRect || rectsDiffer(lastTargetRect, targetRect)
  // const parentChanged = !lastParent || lastParent !== parent
  const parentRectChanged =
    !lastParentRect || rectsDiffer(lastParentRect, parentRect)

  if (parentRectChanged) {
    assignRect(container, parentRect, { addWindow: true })
  }

  if (targetChanged) {
    enableTransition()
    assignRect(tracker, targetRect, { relativeTo: parentRect })

    applyConfiguration(tracker, configuration)
  } else if (targetRectChanged) {
    disableTransition()
    assignRect(tracker, targetRect, { relativeTo: parentRect })
  }

  lastParentRect = parentRect
  // lastParent = parent
  lastTargetRect = targetRect
  lastTarget = target
}

const addTracker = (
  target: HTMLElement,
  configuration: FocusTrackerConfiguration,
) => {
  const tracker = internalState.focusTrackerEl
  const container = internalState.containerEl
  if (!tracker || !container) return

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  assignRect(container, parentRect, { addWindow: true })
  assignRect(tracker, targetRect, {
    relativeTo: parentRect,
    transform: 'scale(2)',
  })

  applyConfiguration(tracker, configuration)

  tracker.style.opacity = '0'
  // assignTransform(tracker, { scale: '2' })
  disableTransition()

  window.requestAnimationFrame(() => {
    enableTransition()
    tracker.style.opacity = '1'
    assignTransform(tracker, { scale: '1' })
  })
}

const removeTracker = () => {
  const tracker = internalState.focusTrackerEl
  if (!tracker) return

  enableTransition()
  tracker.style.opacity = '0'
  assignTransform(tracker, { scale: '2' })
}

const updateFocus = () => {
  if (internalState.isKeyboard) {
    const focusedElement = getVisuallyFocusedElement()
    if (!focusedElement) {
      if (internalState.target) {
        removeTracker()
        internalState.target = undefined
      }
    } else {
      const configuration = getElementConfiguration(focusedElement)
      if (!configuration) {
        if (internalState.target) {
          removeTracker()
          internalState.target = undefined
        }
      } else if (!internalState.target) {
        addTracker(focusedElement, configuration)
        internalState.target = focusedElement
      } else {
        updateTracker(focusedElement, configuration)
        if (internalState.target !== focusedElement) {
          internalState.target = focusedElement
        }
      }
    }
  } else if (internalState.target) {
    removeTracker()
    internalState.target = undefined
  }
}

const focusTracker = {
  configure: (options: Partial<FocusTrackerConfiguration>) => {
    Object.assign(baseConfiguration, options)
  },
  register,
  unregister,
  // watch: (selector: string, options: { style: { color: string } }) => {},
  // unwatch: (selector: string) => {},
  start: () => {
    if (internalState.started) return

    if (!internalState.focusTrackerEl) {
      internalState.containerEl = document.createElement('div')
      internalState.containerEl.className = 'focus-tracker-container'
      internalState.containerEl.style.pointerEvents = 'none'
      // internal.containerEl.style.position = 'fixed'
      internalState.containerEl.style.position = 'absolute'
      internalState.containerEl.style.overflow = 'hidden'
      // internal.containerEl.style.inset = '0'

      internalState.containerEl.style.transition = 'ease-in-out all 200ms'

      document.body.appendChild(internalState.containerEl)

      internalState.focusTrackerEl = document.createElement('div')
      // internalState.focusTrackerEl.className = 'focus-tracker-indicator'
      internalState.focusTrackerEl.style.pointerEvents = 'none'
      internalState.focusTrackerEl.style.position = 'absolute'

      // internal.focusTrackerEl.style.zIndex = '50'
      // internal.focusTrackerEl.style.border = '2px solid red'
      // internal.focusTrackerEl.style.transition = 'ease-in-out all 200ms'
      // internal.focusTrackerEl.style.opacity = '0'
      internalState.containerEl.appendChild(internalState.focusTrackerEl)

      // const style = document.createElement('style')
      // style.innerHTML = `
      //   .focus-tracker-visible *:focus,
      //   .focus-tracker-visible *:focus-visible {
      //     outline: none;
      //   }

      //   *:focus,
      //   *:focus-visible {
      //     outline: none;
      //   }
      // `
      // document.body.appendChild(style)

      //       <div
      //         ref={focusTrackerEl}
      //         className="pointer-events-none absolute z-50 border-2 border-red-400 ring-1 ring-red-500 transition-all duration-200 ring-blur-8"
      //         style={{ opacity: 0 }}
      //       ></div>
    }

    const loop = () => {
      updateFocus()
      internalState.loopId = requestAnimationFrame(loop)
    }
    loop()

    document.addEventListener('keydown', listener)
    document.addEventListener('mousedown', listener)

    internalState.started = true
  },
  stop: () => {
    if (!internalState.started) return
    if (internalState.loopId) {
      cancelAnimationFrame(internalState.loopId)
      internalState.loopId = 0
    }
    document.removeEventListener('keydown', listener)
    document.removeEventListener('mousedown', listener)
    internalState.started = false
  },
}

declare global {
  interface Window {
    focusTracker?: typeof focusTracker
  }
}

if (typeof window !== 'undefined' && !window.focusTracker) {
  window.focusTracker = focusTracker
}

export { focusTracker }
export type { FocusTrackerConfiguration } from './types/FocusTrackerConfiguration'
