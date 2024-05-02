import type { HTMLAttributes } from 'react'

export type DemoGridProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
> & {
  columns?: number
  rows?: number
}

export function DemoGrid(props: DemoGridProps) {
  const { children, columns = 3, rows = 2, style, ...restProps } = props
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  )
}
