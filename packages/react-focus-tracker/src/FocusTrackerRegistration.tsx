import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/FocusTrackerConfiguration'
import { registerFocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/registerFocusTrackerConfiguration'
import { unregisterFocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/unregisterFocusTrackerConfiguration'
import type { ReactElement, Ref } from 'react'
import {
  Children,
  cloneElement,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export type FocusTrackerRegistrationProps =
  Partial<FocusTrackerConfiguration> & {
    children: ReactElement & { ref?: Ref<HTMLElement> }
    refProperty?: string
  }

export function FocusTrackerRegistration(
  props: FocusTrackerRegistrationProps,
): JSX.Element {
  const ref = useRef<HTMLElement>(null)
  const child = Children.only(props.children)
  const refProperty = props.refProperty
  const clone = cloneElement(child, { [refProperty || 'ref']: ref })

  const childRef = refProperty
    ? // eslint-disable-next-line -- not sure how to type it but it works
      (child.props[refProperty] as Ref<HTMLElement>)
    : child.ref
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it works
  useImperativeHandle(childRef, () => ref.current!, [])

  useEffect(() => {
    if (!ref.current) return
    const element = ref.current
    registerFocusTrackerConfiguration(element, {
      boxShadow: props.boxShadow,
      color: props.color,
      offset: props.offset,
      target: props.target,
      thickness: props.thickness,
    })
    return () => {
      unregisterFocusTrackerConfiguration(element)
    }
  }, [
    ref,
    props.boxShadow,
    props.color,
    props.offset,
    props.target,
    props.thickness,
  ])

  return clone
}
