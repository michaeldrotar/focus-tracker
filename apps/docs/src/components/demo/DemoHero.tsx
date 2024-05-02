import { clsx } from 'clsx'
import type { HTMLAttributes, RefObject } from 'react'
import styles from './DemoHero.module.css'

export type DemoHeroProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & { rootRef?: RefObject<HTMLDivElement> }

export function DemoHero(props: DemoHeroProps) {
  const { children, className, rootRef, ...restProps } = props
  return (
    <div
      className={clsx(styles.DemoHero, className)}
      ref={rootRef}
      {...restProps}
    >
      {children}
    </div>
  )
}
