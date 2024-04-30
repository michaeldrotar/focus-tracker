import { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import { useEffect, useRef, useState } from 'react'

type OptionDemoProps = {
  name: keyof FocusTrackerConfiguration
  values: FocusTrackerConfiguration[keyof FocusTrackerConfiguration][]
}

export function OptionDemo({ name, values }: OptionDemoProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    let index = 0
    const focusTracker = createOtherFocusTracker()
    focusTracker.focus(button)
    const interval = setInterval(() => {
      index = (index + 1) % values.length
      focusTracker.configure({ [name]: values[index] })
      setValue(values[index].toString())
    }, 1500)

    return () => {
      console.log('cleanup')
      clearInterval(interval)
      focusTracker.destroy()
    }
  }, [buttonRef, name, values])

  return (
    <div>
      <h2>{name}</h2>
      <button ref={buttonRef}>Button</button>
      <div>{value}</div>
    </div>
  )
}
