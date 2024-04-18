'use client'

import {
  FocusTrackerConfiguration,
  focusTracker,
} from '@michaeldrotar/focus-tracker-js'
import {
  Children,
  ReactElement,
  Ref,
  cloneElement,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export type FocusTrackerRegistrationProps =
  Partial<FocusTrackerConfiguration> & {
    children: ReactElement & { ref?: Ref<unknown> }
    refProperty?: string
  }

export function FocusTrackerRegistration(props: FocusTrackerRegistrationProps) {
  const ref = useRef<HTMLElement>(null)
  const child = Children.only(props.children)
  const refProperty = props.refProperty
  const clone = cloneElement(child, { [refProperty || 'ref']: ref })

  useImperativeHandle(
    refProperty ? child.props[refProperty] : child.ref,
    () => ref.current!,
    [ref, refProperty, child],
  )

  useEffect(() => {
    console.log(
      'child',
      ref,
      refProperty ? child.props[refProperty] : child.ref,
      Object.keys(child),
      Object.keys(child.props),
    )
    if (!ref.current) return

    focusTracker.register(ref.current, props)
  }, [
    ref,
    props.boxShadow,
    props.color,
    props.thickness,
    props.offset,
    props.target,
  ])

  // const child = Children.only(props.children)
  // const clone = cloneElement(child, { ref: ref })
  return clone
}
