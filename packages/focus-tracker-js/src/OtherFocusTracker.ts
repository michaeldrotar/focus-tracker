import { FocusTrackerConfiguration } from './FocusTrackerConfiguration'

export type OtherFocusTracker = {
  /**
   * Set a configuration for this focus tracker.
   *
   * Any properties set will override inherited properties from registered elements.
   */
  configure: (configuration: Partial<FocusTrackerConfiguration>) => void

  /**
   * Assign focus to the given element.
   */
  focus: (element: HTMLElement) => void

  /**
   * Remove focus, hide the tracker.
   */
  blur: () => void

  /**
   * Destroy the focus tracker to cleanup resources.
   *
   * Once called, the focus tracker is no longer usable and shouldn't be referenced again.
   */
  destroy: () => void
}
