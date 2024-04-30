import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import { useEffect, useRef, useState } from 'react'
import Heading from '@theme/Heading'

type OptionDemoProps = {
  name: keyof FocusTrackerConfiguration
  values: FocusTrackerConfiguration[keyof FocusTrackerConfiguration][]
}

export function OptionDemo({ name, values }: OptionDemoProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    let index = 0
    const focusTracker = createOtherFocusTracker()
    focusTracker.focus(button)
    const interval = setInterval(() => {
      index = (index + 1) % values.length
      const currentValue = values[index]
      focusTracker.configure({ [name]: currentValue })
      setDisplayValue(
        currentValue instanceof HTMLElement
          ? currentValue.tagName
          : currentValue.toString(),
      )
    }, 1500)

    return () => {
      clearInterval(interval)
      focusTracker.destroy()
    }
  }, [buttonRef, name, values])

  return (
    <div>
      <Heading as="h2" id={`${name}2`}>
        {name}
      </Heading>
      <button ref={buttonRef} type="button">
        Button
      </button>
      <div>{displayValue}</div>
    </div>
  )
}
