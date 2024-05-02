import { useEffect, useRef, type HTMLAttributes, type RefObject } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import styles from './DemoWindow.module.css'

export type DemoWindowAction =
  | {
      action: 'focus'
      target: string
    }
  | {
      action: 'blur'
    }
  | {
      action: 'wait'
      duration: number
    }

export type DemoWindowProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> & {
  rootRef?: RefObject<HTMLDivElement>
  actions?: DemoWindowAction[]
}

export function DemoWindow(props: DemoWindowProps) {
  const { children, rootRef, actions, ...restProps } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !actions?.length) return

    let index = 0
    let timeout: NodeJS.Timeout
    const focusTracker = createOtherFocusTracker()
    const execute = () => {
      const action = actions[index]
      let target: Element | null = null
      let delay = 0
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
        case 'wait':
          delay = action.duration
          break
      }
      index = (index + 1) % actions.length
      timeout = setTimeout(execute, delay)
    }

    execute()

    return () => {
      clearTimeout(timeout)
      focusTracker.destroy()
    }
  })

  return (
    <div ref={rootRef} {...restProps}>
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
        <div className={styles.demoWindowBody} ref={ref}>
          {children}
        </div>
      </div>
      <div className={styles.demoWindowShadow} />
    </div>
  )
}
