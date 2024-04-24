'use client'

import { useEffect, useRef } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import { TestComponents } from './TestComponents'

export default function OtherFocusTrackerSetup() {
  const textRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const textEl = textRef.current
    const dropdownEl = dropdownRef.current
    if (!textEl || !dropdownEl) return

    const focusTracker = createOtherFocusTracker()
    let num = 0
    const thicknesses = [3, 5, 10, 10, 5, 3]
    const targets = [textEl, textEl, textEl, dropdownEl, dropdownEl, dropdownEl]
    const intervalId = setInterval(() => {
      num += 1
      if (num > thicknesses.length * targets.length) num = 0
      const thickness = thicknesses[num % thicknesses.length]
      const target = targets[num % targets.length]
      focusTracker.configure({ thickness })
      if (target) focusTracker.focus(target)
    }, 1000)
    return () => {
      clearInterval(intervalId)
      focusTracker.destroy()
    }
  })

  return (
    <>
      <h2>OtherFocusTracker</h2>
      <TestComponents dropdownRef={dropdownRef} textRef={textRef} />
    </>
  )
}
