import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker'
import { UserFocusTracker } from '@michaeldrotar/react-focus-tracker/UserFocusTracker'
import React from 'react'

export default function Root({ children }) {
  return (
    <>
      <FocusTrackerRegistration>
        <div>{children}</div>
      </FocusTrackerRegistration>
      <UserFocusTracker />
    </>
  )
}
