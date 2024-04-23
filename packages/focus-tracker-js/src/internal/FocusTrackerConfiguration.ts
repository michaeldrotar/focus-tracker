export type FocusTrackerConfiguration = {
  /**
   * Identical to css box-shadow property.
   * Can use currentColor to match the assigned color.
   */
  boxShadow: string

  /**
   * Sets the color of the focus ring.
   */
  color: string

  /**
   * Sets the offset of the focus ring.
   * A negative offset will move the focus ring inside the element.
   */
  offset: string | number

  /**
   * Sets the visual target of the focus ring.
   */
  target: 'self' | 'target' | HTMLElement

  /**
   * Sets the thickness of the focus ring.
   */
  thickness: string | number
}
