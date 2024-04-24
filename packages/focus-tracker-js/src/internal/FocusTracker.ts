import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'
import { Rect } from './rects'

export type FocusTracker = {
  update: () => void
  destroy: () => void
  indicatorEl: HTMLElement
  containerEl: HTMLElement

  lastTarget?: HTMLElement | undefined
  // lastParent: HTMLElement | undefined
  lastTargetRect?: Rect | undefined
  lastParentRect?: Rect | undefined
  lastConfiguration?: FocusTrackerConfiguration | undefined
}

export type UserFocusTracker = FocusTracker & {}

export type OtherFocusTracker = FocusTracker & {
  configure: (configuration: Partial<FocusTrackerConfiguration>) => void
  focus: (element: HTMLElement) => void
  blur: () => void
}
