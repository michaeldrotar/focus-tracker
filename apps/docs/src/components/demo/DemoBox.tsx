import type { HTMLAttributes } from 'react'

export type DemoBoxProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'style'
>

export function DemoBox(props: DemoBoxProps) {
  return <div {...props} />
}
