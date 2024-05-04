import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './DemoButton.module.css'

export type DemoButtonProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  colored?: boolean
  outlined?: boolean
  shape?: 'circle' | 'rounded'
}

export function DemoButton(props: DemoButtonProps) {
  const { children, className, colored, outlined, shape, ...restProps } = props
  return (
    <div
      className={clsx(
        styles.DemoButton,
        outlined && styles.DemoButtonOutlined,
        shape === 'circle' && styles.DemoButtonCircle,
        colored && styles.DemoButtonColored,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}
