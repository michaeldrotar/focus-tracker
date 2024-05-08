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
  showKeyPresses?: boolean
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
    showKeyPresses,
    onInit,
    onAction,
    ...restProps
  } = props
  const demoBodyRef = useRef<HTMLDivElement>(null)
  const keyboardKeyRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef<Partial<DemoWindowProps>>(props)

  useEffect(() => {
    propsRef.current = { showKeyPresses, onInit, onAction }
  }, [showKeyPresses, onInit, onAction])

  useStableEffect(() => {
    const element = demoBodyRef.current
    const keyboardKey = keyboardKeyRef.current
    if (!element || !keyboardKey || !actions?.length) return

    let index = 0
    let timeout: NodeJS.Timeout
    const focusTracker = createOtherFocusTracker()
    const clickOverlay = element.querySelector('[data-demo-click-overlay]')
    const flyoutList = element.querySelector('[data-demo-flyout-list]')
    let flyoutListOpener: HTMLElement | null = null

    const flashKeyboardKey = (key: string) => {
      if (!propsRef.current.showKeyPresses) return
      keyboardKey.textContent = key
      keyboardKey.style.transition = 'none'
      keyboardKey.style.opacity = '1'
      setTimeout(() => {
        keyboardKey.style.transition = ''
        keyboardKey.style.opacity = '0'
      }, 250)
    }

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
      flashKeyboardKey('Enter')
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
      flashKeyboardKey('▼')
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
      flashKeyboardKey('Enter')
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
      flashKeyboardKey('Enter')
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
          flashKeyboardKey('Tab')
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
            flashKeyboardKey('Tab')
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
      if (propsRef.current.onAction) {
        propsRef.current.onAction(action)
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

    if (propsRef.current.onInit) {
      propsRef.current.onInit(focusTracker, demoBodyRef.current)
    }
    execute()

    return () => {
      clearTimeout(timeout)
      focusTracker.destroy()
    }
  }, [actions, delayInMs])

  return (
    <figure
      className={clsx(styles.demoWindowContainer, 'relative', className)}
      ref={rootRef}
      {...restProps}
    >
      {caption ? (
        <figcaption className={styles.demoWindowCaption}>{caption}</figcaption>
      ) : null}
      <div className={clsx(styles.demoWindow, 'relative')}>
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
          ref={demoBodyRef}
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
      <div
        className={clsx(
          'text-foreground border-1 absolute bottom-5 left-1/2 -translate-x-1/2 rounded-lg border-solid px-2 py-1 text-sm font-bold uppercase text-opacity-50',
          'border-neutral-300 bg-gradient-to-b from-neutral-100 to-neutral-300', // https://codepen.io/giumagnani/pen/jBNJKw
          'opacity-0 transition-opacity duration-500 ease-out',
        )}
        ref={keyboardKeyRef}
        style={{
          boxShadow: `
                0 0 1px rgb(var(--theme-color-neutral-500)),
                0 1px 0 0 rgb(var(--theme-color-background)),
                0 -1px 0 0 rgb(var(--theme-color-neutral-300)),
                0 3px 0 rgb(var(--theme-color-neutral-200)),
                0 4px 8px rgb(var(--theme-color-neutral-400) / 40),
                1px 1px 2px rgb(var(--theme-color-neutral-400) / 25),
                -1px 1px 2px rgb(var(--theme-color-neutral-400) / 25),
                0 4px 8px rgb(var(--theme-color-neutral-400) / 10)
              `,
          textShadow: `
                0 0.5px 1px rgb(var(--theme-color-neutral-500)),
                0 2px 6px rgb(var(--theme-color-foreground)),
              `,
        }}
      >
        Tab
      </div>
    </figure>
  )
}
