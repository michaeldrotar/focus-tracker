'use client'

import { stopUserFocusTracker } from '@michaeldrotar/focus-tracker-js/stopUserFocusTracker'
import { startUserFocusTracker } from '@michaeldrotar/focus-tracker-js/startUserFocusTracker'
import { useEffect } from 'react'

export function UserFocusTracker(): null {
  useEffect(() => {
    startUserFocusTracker()
    return () => {
      stopUserFocusTracker()
    }
  })
  return null
}
