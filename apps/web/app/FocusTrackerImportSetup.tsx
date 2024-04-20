'use client'

import { useEffect, useRef } from 'react'
import { focusTracker } from '@michaeldrotar/focus-tracker-js'
import { TestComponents } from './TestComponents'

export default function FocusTrackerImportSetup() {
  const componentsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!componentsRef.current) return
    const componentsEl = componentsRef.current
    focusTracker.register(componentsEl)
    focusTracker.start()
    return () => {
      focusTracker.unregister(componentsEl)
    }
  }, [])
  return (
    <>
      <h2>FocusTracker</h2>
      <TestComponents rootRef={componentsRef} />
    </>
  )
}
