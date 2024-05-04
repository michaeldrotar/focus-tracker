import { useEffect, useRef, type HTMLAttributes, type RefObject } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import { clsx } from 'clsx'
import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/FocusTrackerConfiguration'
import { useStableEffect } from '@site/src/hooks/useStableEffect'
import styles from './DemoWindow.module.css'

type FocusAction = {
  action: 'focus'
  target: string
}

type BlurAction = {
  action: 'blur'
}

type ConfigAction = {
  action: 'config'
  config: Partial<FocusTrackerConfiguration>
}

type AnyAction = FocusAction | BlurAction | ConfigAction

export type DemoWindowAction = AnyAction | AnyAction[]

export type DemoWindowProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  actions?: DemoWindowAction[]
  caption?: string
  centerContent?: boolean
  delayInMs?: number
  rootRef?: RefObject<HTMLElement>
  onInit?: (
    focusTracker: ReturnType<typeof createOtherFocusTracker>,
    demoElement: HTMLElement,
  ) => void
  onAction?: (action: AnyAction) => void
}

export function DemoWindow(props: DemoWindowProps) {
  const {
    actions,
    caption,
    centerContent,
    children,
    className,
    delayInMs,
    rootRef,
    onInit,
    onAction,
    ...restProps
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const onInitRef = useRef<DemoWindowProps['onInit']>(props.onInit)
  const onActionRef = useRef<((action: AnyAction) => void) | undefined>(
    onAction,
  )

  useEffect(() => {
    onInitRef.current = onInit
    onActionRef.current = onAction
  }, [onInit, onAction])

  useStableEffect(() => {
    const element = ref.current
    if (!element || !actions?.length) return

    let index = 0
    let timeout: NodeJS.Timeout
    const focusTracker = createOtherFocusTracker()

    const runAction = (action: AnyAction) => {
      let target: Element | null = null
      switch (action.action) {
        case 'focus':
          target = element.querySelector(action.target)
          if (target && target instanceof HTMLElement) {
            focusTracker.focus(target)
          }
          break
        case 'blur':
          focusTracker.blur()
          break
        case 'config':
          focusTracker.configure(action.config)
          break
      }
      if (onActionRef.current) {
        onActionRef.current(action)
      }
    }

    const execute = () => {
      const action = actions[index]
      if (Array.isArray(action)) {
        action.forEach(runAction)
      } else {
        runAction(action)
      }
      index = (index + 1) % actions.length
      timeout = setTimeout(execute, delayInMs || 1000)
    }

    if (onInitRef.current) {
      onInitRef.current(focusTracker, ref.current)
    }
    execute()

    return () => {
      clearTimeout(timeout)
      focusTracker.destroy()
    }
  }, [actions, delayInMs])

  return (
    <figure
      className={clsx(styles.demoWindowContainer, className)}
      ref={rootRef}
      {...restProps}
    >
      {caption ? (
        <figcaption className={styles.demoWindowCaption}>{caption}</figcaption>
      ) : null}
      <div className={styles.demoWindow}>
        <div className={styles.demoWindowTabBar}>
          <div className={styles.demoWindowButtons}>
            <div
              className={`${styles.demoWindowButton} ${styles.demoWindowButtonRed}`}
            />
            <div
              className={`${styles.demoWindowButton} ${styles.demoWindowButtonYellow}`}
            />
            <div
              className={`${styles.demoWindowButton} ${styles.demoWindowButtonGreen}`}
            />
          </div>
          <div className={styles.demoWindowTab} />
        </div>
        <div className={styles.demoWindowAddressBar} />
        <div
          className={clsx(
            styles.demoWindowBody,
            centerContent && styles.demoWindowBodyCentered,
          )}
          ref={ref}
        >
          {children}
        </div>
      </div>
      <div className={styles.demoWindowShadow} />
    </figure>
  )
}
