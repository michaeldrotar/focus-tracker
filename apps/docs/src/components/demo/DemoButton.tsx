import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './DemoButton.module.css'

export type DemoButtonProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  outlined?: boolean
}

export function DemoButton(props: DemoButtonProps) {
  const { children, className, outlined, ...restProps } = props
  return (
    <div
      className={clsx(
        styles.DemoButton,
        outlined && styles.DemoButtonOutlined,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}
