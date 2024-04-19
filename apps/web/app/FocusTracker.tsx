'use client'

import {
  FocusTrackerRegistration,
  FocusTrackerRegistrationProps,
} from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'
import React from 'react'

export function FocusTracker(props: FocusTrackerRegistrationProps) {
  return <FocusTrackerRegistration {...props} />
}
