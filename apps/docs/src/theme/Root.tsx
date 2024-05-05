import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker'
import { UserFocusTracker } from '@michaeldrotar/react-focus-tracker/UserFocusTracker'
import React from 'react'

export default function Root({ children }) {
  return (
    <>
      <FocusTrackerRegistration
        boxShadow="0 0 0.5rem 1px currentColor"
        color="rgb(var(--theme-color-primary-500))"
        thickness={2}
      >
        <div>{children}</div>
      </FocusTrackerRegistration>
      <UserFocusTracker />
    </>
  )
}
