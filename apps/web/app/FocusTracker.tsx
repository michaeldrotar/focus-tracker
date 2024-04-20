'use client'

import type { FocusTrackerRegistrationProps } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'
import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'
import React from 'react'

export function FocusTracker(props: FocusTrackerRegistrationProps) {
  return <FocusTrackerRegistration {...props} />
}
