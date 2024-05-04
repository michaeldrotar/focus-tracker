import { clsx } from 'clsx'
import type { HTMLAttributes, ReactNode, RefObject } from 'react'
import styles from './DemoHero.module.css'
import { DemoBox } from './DemoBox'

export type DemoHeroProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  colored?: boolean
  rootRef?: RefObject<HTMLDivElement>
  primaryButton?: ReactNode
  secondaryButton?: ReactNode
}

export function DemoHero(props: DemoHeroProps) {
  const {
    children,
    className,
    colored,
    primaryButton,
    rootRef,
    secondaryButton,
    ...restProps
  } = props
  return (
    <div
      className={clsx(
        styles.DemoHero,
        colored && styles.DemoHeroColored,
        className,
      )}
      ref={rootRef}
      {...restProps}
    >
      <DemoBox
        style={{
          position: 'absolute',
          left: '10%',
          bottom: '20%',
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '0.25rem',
        }}
      >
        {primaryButton}
        {secondaryButton}
      </DemoBox>
      {children}
    </div>
  )
}
