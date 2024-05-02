import { useEffect, useRef, type HTMLAttributes, type RefObject } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import styles from './DemoWindow.module.css'

type FocusAction = {
  action: 'focus'
  target: 'string'
}

type BlurAction = {
  action: 'blur'
}

export type DemoWindowAction = FocusAction | BlurAction

export type DemoWindowProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  actions?: DemoWindowAction[]
  caption?: string
  rootRef?: RefObject<HTMLElement>
}

export function DemoWindow(props: DemoWindowProps) {
  const { actions, caption, children, rootRef, ...restProps } = props
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
      }
      index = (index + 1) % actions.length
      timeout = setTimeout(execute, 1000)
    }

    execute()

    return () => {
      clearTimeout(timeout)
      focusTracker.destroy()
    }
  })

  return (
    <figure ref={rootRef} {...restProps}>
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
        <div className={styles.demoWindowBody} ref={ref}>
          {children}
        </div>
      </div>
      <div className={styles.demoWindowShadow} />
    </figure>
  )
}
