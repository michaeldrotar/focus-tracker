'use client'

import { focusTracker } from '@michaeldrotar/focus-tracker-js'
import { useEffect, useRef } from 'react'

export function Card({
  className,
  title,
  children,
  href,
  color,
  ...restProps
}: {
  className?: string
  title: string
  children: React.ReactNode
  href: string
  color?: string
}): JSX.Element {
  const rootRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    if (!rootRef.current) return
    focusTracker.register(rootRef.current, {
      boxShadow: 'currentColor 0px 0px 8px 4px',
      color: color,
      thickness: 3,
    })
  }, [rootRef, color])
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
      {...restProps}
      ref={rootRef}
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  )
}
