'use client'

import { useEffect, useRef, useState } from 'react'
import { TestComponents } from './TestComponents'
import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'

export default function ReactFocusTrackerSetup() {
  const [state, setState] = useState(0)
  const componentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('components', componentsRef.current)
  }, [componentsRef.current])

  useEffect(() => {
    const id = setInterval(() => setState((state) => (state + 1) % 10), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <h2>ReactFocusTracker</h2>
      <FocusTrackerRegistration
        thickness={state}
        color="red"
        offset={Math.ceil(state / 3)}
        refProperty={state < 5 ? undefined : 'rootRef'}
      >
        {state < 5 ? (
          <div ref={componentsRef}>
            <button>Foo</button>
            <button>Bar</button>
            <button>Baz</button>
          </div>
        ) : (
          <TestComponents rootRef={componentsRef} />
        )}
        {/* <TestComponents /> */}
      </FocusTrackerRegistration>
    </>
  )
}
