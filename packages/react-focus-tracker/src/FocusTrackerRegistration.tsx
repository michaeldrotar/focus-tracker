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
    if (!ref.current) return
    focusTracker.register(ref.current, {
      boxShadow: props.boxShadow,
      color: props.color,
      offset: props.offset,
      target: props.target,
      thickness: props.thickness,
    })
  }, [
    ref,
    props.boxShadow,
    props.color,
    props.offset,
    props.target,
    props.thickness,
  ])

  // const child = Children.only(props.children)
  // const clone = cloneElement(child, { ref: ref })
  return clone
}
