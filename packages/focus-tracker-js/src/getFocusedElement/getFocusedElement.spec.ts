import { describe, it, expect } from 'vitest'
import { getFocusedElement } from './getFocusedElement'

describe(getFocusedElement, () => {
  it('provides elements with focus', () => {
    expect(getFocusedElement()).toBe(undefined)
    expect(document.activeElement).toBe(document.body)
    console.log(document.activeElement)
  })
})
