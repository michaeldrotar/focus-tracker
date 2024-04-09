import { getElementPosition } from './getElementPosition/getElementPosition'
import { getVisuallyFocusedElement } from './getVisuallyFocusedElement/getVisuallyFocusedElement'

export { getFocusedElement } from './getFocusedElement/getFocusedElement'

/*
  focusTracker.register(document.body, { attrPrefix: 'data-focus-tracker'})
  focusTracker.register('body', { attrPrefix: 'data-focus-tracker'})
  focusTracker.watch('button', { style: { color: 'red' } })
  focusTracker.start()
*/

export type FocusTrackerConfiguration = {
  debug: boolean
}

const internal = {
  started: false,
  loopId: 0,
  isKeyboard: false,
  focusTrackerEl: undefined as HTMLElement | undefined,
  target: undefined as HTMLElement | undefined,
}

const configuration: FocusTrackerConfiguration = {
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
  if (!tracker) return
  tracker.style.transition = 'none'
}
const enableTransition = () => {
  const tracker = internal.focusTrackerEl
  if (!tracker) return
  tracker.style.transition = 'ease-in-out all 200ms'
}

const updateTracker = (target: HTMLElement) => {
  const tracker = internal.focusTrackerEl
  if (!tracker) return

  const position = getElementPosition(target)
  tracker.style.left = `${position.x}px`
  tracker.style.top = `${position.y}px`
  tracker.style.width = `${target.offsetWidth}px`
  tracker.style.height = `${target.offsetHeight}px`
  tracker.style.borderRadius = `${window.getComputedStyle(target).borderRadius}`
}

const addTracker = (target: HTMLElement) => {
  const tracker = internal.focusTrackerEl
  if (!tracker) return

  disableTransition()
  updateTracker(target)
  tracker.style.opacity = '0'
  tracker.style.transform = 'scale(2)'

  window.requestAnimationFrame(() => {
    enableTransition()
    tracker.style.opacity = '1'
    tracker.style.transform = 'scale(1)'
  })
}

const removeTracker = () => {
  const tracker = internal.focusTrackerEl
  if (!tracker) return

  tracker.style.opacity = '0'
  tracker.style.transform = 'scale(2)'
}

const updateFocus = () => {
  if (internal.isKeyboard) {
    const focusedElement = getVisuallyFocusedElement()
    if (!focusedElement) {
      removeTracker()
    } else if (!internal.target && focusedElement) {
      addTracker(focusedElement)
    } else if (internal.target !== focusedElement) {
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
  register: (el: HTMLElement | string, options: { attrPrefix: string }) => {},
  unregister: (el: HTMLElement | string) => {},
  watch: (selector: string, options: { style: { color: string } }) => {},
  unwatch: (selector: string) => {},
  start: () => {
    if (internal.started) return
    if (configuration.debug) {
      console.log('Focus tracker started')
    }

    if (!internal.focusTrackerEl) {
      internal.focusTrackerEl = document.createElement('div')
      internal.focusTrackerEl.className = 'focus-tracker-indicator'
      internal.focusTrackerEl.style.pointerEvents = 'none'
      internal.focusTrackerEl.style.position = 'absolute'
      // internal.focusTrackerEl.style.zIndex = '50'
      // internal.focusTrackerEl.style.border = '2px solid red'
      // internal.focusTrackerEl.style.transition = 'ease-in-out all 200ms'
      // internal.focusTrackerEl.style.opacity = '0'
      document.body.appendChild(internal.focusTrackerEl)

      const style = document.createElement('style')
      style.innerHTML = `
        .focus-tracker-visible *:focus,
        .focus-tracker-visible *:focus-visible {
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
