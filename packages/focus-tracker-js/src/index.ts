import { getElementConfiguration } from './getElementConfiguration/getElementConfiguration'
import { getStackingParent } from './getStackingParent/getStackingParent'
import { getVisuallyFocusedElement } from './getVisuallyFocusedElement/getVisuallyFocusedElement'

export { getFocusedElement } from './getFocusedElement/getFocusedElement'

/*
  focusTracker.register(document.body, { attrPrefix: 'data-focus-tracker'})
  focusTracker.register('body', { attrPrefix: 'data-focus-tracker'})
  focusTracker.watch('button', { style: { color: 'red' } })
  focusTracker.start()
*/

export type FocusTrackerConfiguration = {
  class: string
  debug: boolean
}

const internal = {
  started: false,
  loopId: 0,
  isKeyboard: false,
  focusTrackerEl: undefined as HTMLElement | undefined,
  containerEl: undefined as HTMLElement | undefined,
  target: undefined as HTMLElement | undefined,
}

const configuration: FocusTrackerConfiguration = {
  class: '',
  debug: false,
}

const listener = (event: KeyboardEvent | MouseEvent) => {
  const wasKeyboard = internal.isKeyboard
  if ('key' in event) {
    if (event.key === 'Tab') internal.isKeyboard = true
  } else {
    internal.isKeyboard = false
  }
  if (wasKeyboard !== internal.isKeyboard) {
    if (internal.isKeyboard) {
      document.documentElement.classList.add('focus-tracker-visible')
    } else {
      document.documentElement.classList.remove('focus-tracker-visible')
    }
  }
}

const disableTransition = () => {
  const tracker = internal.focusTrackerEl
  const container = internal.containerEl
  if (!tracker || !container) return
  tracker.style.transition = 'none'
  container.style.transition = 'none'
}
const enableTransition = () => {
  const tracker = internal.focusTrackerEl
  const container = internal.containerEl
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
let lastParent: HTMLElement | undefined
let lastTargetRect: Rect | undefined
let lastParentRect: Rect | undefined

const updateTracker = (target: HTMLElement) => {
  const tracker = internal.focusTrackerEl
  const container = internal.containerEl
  if (!tracker || !container) return

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  const targetChanged = !lastTarget || lastTarget !== target
  const targetRectChanged =
    !lastTargetRect || rectsDiffer(lastTargetRect, targetRect)
  const parentChanged = !lastParent || lastParent !== parent
  const parentRectChanged =
    !lastParentRect || rectsDiffer(lastParentRect, parentRect)

  if (
    targetChanged ||
    targetRectChanged ||
    parentChanged ||
    parentRectChanged
  ) {
    console.log({
      targetChanged,
      targetRectChanged,
      parentChanged,
      parentRectChanged,
    })
  }

  if (parentRectChanged) {
    assignRect(container, parentRect, { addWindow: true })
  }

  if (targetChanged) {
    enableTransition()
    assignRect(tracker, targetRect, { relativeTo: parentRect })

    const elementConfiguration: FocusTrackerConfiguration = {
      ...configuration,
      ...getElementConfiguration(target),
    }
    tracker.className = `focus-tracker-indicator ${elementConfiguration.class}`
  } else if (targetRectChanged) {
    disableTransition()
    assignRect(tracker, targetRect, { relativeTo: parentRect })
  }

  lastParentRect = parentRect
  lastParent = parent
  lastTargetRect = targetRect
  lastTarget = target
}

const addTracker = (target: HTMLElement) => {
  const tracker = internal.focusTrackerEl
  const container = internal.containerEl
  if (!tracker || !container) return

  // updateTracker(target)

  const targetRect = getElementRect(target)

  const parent = getStackingParent(target)
  const parentRect = getElementRect(parent)

  assignRect(container, parentRect, { addWindow: true })
  assignRect(tracker, targetRect, {
    relativeTo: parentRect,
    transform: 'scale(2)',
  })

  const elementConfiguration: FocusTrackerConfiguration = {
    ...configuration,
    ...getElementConfiguration(target),
  }
  tracker.className = `focus-tracker-indicator ${elementConfiguration.class}`

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
  const tracker = internal.focusTrackerEl
  if (!tracker) return

  enableTransition()
  tracker.style.opacity = '0'
  assignTransform(tracker, { scale: '2' })
}

const updateFocus = () => {
  if (internal.isKeyboard) {
    const focusedElement = getVisuallyFocusedElement()
    if (!focusedElement) {
      removeTracker()
    } else if (!internal.target && focusedElement) {
      addTracker(focusedElement)
    } else {
      updateTracker(focusedElement)
    }
    if (internal.target !== focusedElement) internal.target = focusedElement
  } else if (internal.target) {
    removeTracker()
    internal.target = undefined
  }
}

export const focusTracker = {
  configure: (options: Partial<FocusTrackerConfiguration>) => {
    Object.assign(configuration, options)
  },
  // register: (el: HTMLElement | string, options: { attrPrefix: string }) => {},
  // unregister: (el: HTMLElement | string) => {},
  // watch: (selector: string, options: { style: { color: string } }) => {},
  // unwatch: (selector: string) => {},
  start: () => {
    if (internal.started) return
    if (configuration.debug) {
      console.log('Focus tracker started')
    }

    if (!internal.focusTrackerEl) {
      internal.containerEl = document.createElement('div')
      internal.containerEl.className = 'focus-tracker-container'
      internal.containerEl.style.pointerEvents = 'none'
      // internal.containerEl.style.position = 'fixed'
      internal.containerEl.style.position = 'absolute'
      internal.containerEl.style.overflow = 'hidden'
      // internal.containerEl.style.inset = '0'

      internal.containerEl.style.transition = 'ease-in-out all 200ms'

      if (configuration.debug) {
        // internal.containerEl.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }

      document.body.appendChild(internal.containerEl)

      internal.focusTrackerEl = document.createElement('div')
      internal.focusTrackerEl.className = 'focus-tracker-indicator'
      internal.focusTrackerEl.style.pointerEvents = 'none'
      internal.focusTrackerEl.style.position = 'absolute'
      // internal.focusTrackerEl.style.zIndex = '50'
      // internal.focusTrackerEl.style.border = '2px solid red'
      // internal.focusTrackerEl.style.transition = 'ease-in-out all 200ms'
      // internal.focusTrackerEl.style.opacity = '0'
      internal.containerEl.appendChild(internal.focusTrackerEl)

      const style = document.createElement('style')
      style.innerHTML = `
        .focus-tracker-visible *:focus,
        .focus-tracker-visible *:focus-visible {
          outline: none;
        }

        *:focus,
        *:focus-visible {
          outline: none;
        }
      `
      document.body.appendChild(style)

      //       <div
      //         ref={focusTrackerEl}
      //         className="pointer-events-none absolute z-50 border-2 border-red-400 ring-1 ring-red-500 transition-all duration-200 ring-blur-8"
      //         style={{ opacity: 0 }}
      //       ></div>
    }

    const loop = () => {
      updateFocus()
      internal.loopId = requestAnimationFrame(loop)
    }
    loop()

    document.addEventListener('keydown', listener)
    document.addEventListener('mousedown', listener)

    internal.started = true
  },
  stop: () => {
    if (!internal.started) return
    if (configuration.debug) {
      console.log('Focus tracker stopped')
    }
    if (internal.loopId) {
      cancelAnimationFrame(internal.loopId)
      internal.loopId = 0
    }
    document.removeEventListener('keydown', listener)
    document.removeEventListener('mousedown', listener)
    internal.started = false
  },
}

if (typeof window !== 'undefined' && !window.focusTracker) {
  window.focusTracker = focusTracker
}
