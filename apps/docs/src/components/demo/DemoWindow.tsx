import { useEffect, useRef, type HTMLAttributes, type RefObject } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import { clsx } from 'clsx'
import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/FocusTrackerConfiguration'
import { useStableEffect } from '@site/src/hooks/useStableEffect'
import styles from './DemoWindow.module.css'

type BlurAction = {
  action: 'blur'
}

type ClickAction = {
  action: 'click'
  target: string
}

type ClickListItemAction = {
  action: 'click-item'
  which: 1 | 2 | 3 | 4 | 5
}

type CloseListAction = {
  action: 'close-list'
}

type ConfigAction = {
  action: 'config'
  config: Partial<FocusTrackerConfiguration>
}

type FocusAction = {
  action: 'focus'
  target: string
}

type OpenListAction = {
  action: 'open-list'
  target: string
}

type SelectListItemAction = {
  action: 'select-item'
  which: 1 | 2 | 3 | 4 | 5
}

type AnyAction =
  | BlurAction
  | ClickAction
  | ClickListItemAction
  | CloseListAction
  | ConfigAction
  | FocusAction
  | OpenListAction
  | SelectListItemAction

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
    delayInMs = 1000,
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
    const clickOverlay = element.querySelector('[data-demo-click-overlay]')
    const flyoutList = element.querySelector('[data-demo-flyout-list]')
    let flyoutListOpener: HTMLElement | null = null

    const click = (target: HTMLElement, delay: number = delayInMs) => {
      const position = target.style.position
      const overflow = target.style.overflow
      if (!position) target.style.position = 'relative'
      if (!overflow) target.style.overflow = 'hidden'
      if (clickOverlay) {
        target.append(clickOverlay)
        clickOverlay.classList.add(styles.Clicked)
        setTimeout(() => {
          clickOverlay.classList.remove(styles.Clicked)
          element.append(clickOverlay)
          target.style.position = position
          target.style.overflow = overflow
        }, delay)
      }
    }

    const selectItem = (which: 1 | 2 | 3 | 4 | 5) => {
      element
        .querySelectorAll('[data-demo-flyout-list] > div')
        .forEach((item) => {
          item.classList.remove(styles.Selected)
        })
      const item = element.querySelector(`[data-demo-flyout-item-${which}]`)
      if (item instanceof HTMLElement) {
        item.classList.add(styles.Selected)
      }
    }

    const openList = (target: HTMLElement) => {
      if (flyoutList instanceof HTMLElement) {
        selectItem(1)
        click(target, delayInMs / 2)
        flyoutListOpener = target
        setTimeout(() => {
          focusTracker.focus(flyoutList)
          flyoutList.classList.add(styles.Opened)
        }, delayInMs / 2)
      }
    }

    const closeList = () => {
      if (flyoutList instanceof HTMLElement) {
        flyoutList.classList.remove(styles.Opened)
        if (flyoutListOpener instanceof HTMLElement) {
          focusTracker.focus(flyoutListOpener)
        }
      }
    }

    const clickItem = (which: 1 | 2 | 3 | 4 | 5) => {
      const item = element.querySelector(`[data-demo-flyout-item-${which}]`)
      if (item instanceof HTMLElement) {
        click(item, delayInMs / 2)
        setTimeout(() => {
          closeList()
        }, delayInMs / 2)
      }
    }

    const getTarget = (target: string) => {
      const targetElement = element.querySelector(target)
      if (targetElement instanceof HTMLElement) {
        return targetElement
      }
    }

    const runAction = (action: AnyAction) => {
      const target = 'target' in action ? getTarget(action.target) : undefined
      switch (action.action) {
        case 'blur':
          focusTracker.blur()
          break
        case 'click':
          if (target) {
            click(target)
          }
          break
        case 'click-item':
          clickItem(action.which)
          break
        case 'close-list':
          closeList()
          break
        case 'config':
          focusTracker.configure(action.config)
          break
        case 'focus':
          if (target) {
            focusTracker.focus(target)
          }
          break
        case 'open-list':
          if (target) {
            openList(target)
          }
          break
        case 'select-item':
          selectItem(action.which)
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
      timeout = setTimeout(execute, delayInMs)
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
          <div
            className={styles.demoWindowClickOverlay}
            data-demo-click-overlay
          />
          <div className={styles.demoWindowFlyoutList} data-demo-flyout-list>
            <div
              className={styles.demoWindowFlyoutItem}
              data-demo-flyout-item-1
            />
            <div
              className={styles.demoWindowFlyoutItem}
              data-demo-flyout-item-2
            />
            <div
              className={styles.demoWindowFlyoutItem}
              data-demo-flyout-item-3
            />
            <div
              className={styles.demoWindowFlyoutItem}
              data-demo-flyout-item-4
            />
            <div
              className={styles.demoWindowFlyoutItem}
              data-demo-flyout-item-5
            />
          </div>
        </div>
      </div>
      <div className={styles.demoWindowShadow} />
    </figure>
  )
}
