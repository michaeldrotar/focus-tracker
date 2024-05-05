import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker'
import { UserFocusTracker } from '@michaeldrotar/react-focus-tracker/UserFocusTracker'
import React, { useEffect, useState } from 'react'
import { PostHogProvider } from 'posthog-js/react'
import type { PostHog } from 'posthog-js'
import { useLocation } from '@docusaurus/router'

export default function Root({ children }) {
  const [posthogClient, setPosthogClient] = useState<PostHog>()
  const location = useLocation()

  useEffect(() => {
    if ('posthog' in window && window.posthog) {
      setPosthogClient(window.posthog as PostHog)
    }
  }, [])

  useEffect(() => {
    if (!posthogClient) return
    posthogClient.capture('$pageview')
  }, [location, posthogClient])

  return (
    <PostHogProvider client={posthogClient}>
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
