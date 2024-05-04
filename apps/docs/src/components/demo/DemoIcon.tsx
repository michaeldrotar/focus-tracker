import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './DemoIcon.module.css'

export type DemoIconProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className' | 'style'
> & {
  outlined?: boolean
}

export function DemoIcon(props: DemoIconProps) {
  const { children, className, outlined, ...restProps } = props
  return (
    <div
      className={clsx(
        styles.DemoIcon,
        outlined && styles.DemoIconOutlined,
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}
