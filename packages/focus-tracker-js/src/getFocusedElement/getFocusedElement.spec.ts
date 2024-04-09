import { describe, it, expect } from 'vitest'
import { getFocusedElement } from './getFocusedElement'

describe(getFocusedElement, () => {
  it('provides elements with focus', () => {
    expect(document.activeElement).toBe(document.body)
    expect(getFocusedElement()).toBe(undefined)
  })
})
