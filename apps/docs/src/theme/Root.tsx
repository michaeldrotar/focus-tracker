import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker'
import { UserFocusTracker } from '@michaeldrotar/react-focus-tracker/UserFocusTracker'
import React, { useEffect } from 'react'
import { PostHogProvider } from 'posthog-js/react'
import { useLocation } from '@docusaurus/router'
import { posthog } from 'posthog-js'

posthog.init('phc_BAB2VZljdFI4ihSLVaIkLumI1d0xoR9tKGIQskpS4SR', {
  api_host: 'https://us.i.posthog.com',
  debug: true,
  capture_pageview: false,
})

export default function Root({ children }) {
  const location = useLocation()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [location])

  return (
    <PostHogProvider client={posthog}>
      <FocusTrackerRegistration
        boxShadow="0 0 0.5rem 1px currentColor"
        color="rgb(var(--theme-color-primary-500))"
        thickness={2}
      >
        <div>{children}</div>
      </FocusTrackerRegistration>
      <UserFocusTracker />
    </PostHogProvider>
  )
}
