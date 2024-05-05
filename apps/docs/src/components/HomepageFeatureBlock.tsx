import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type HomepageFeatureBlockProps = Pick<
  HTMLAttributes<HTMLElement>,
  'children' | 'className'
> & {
  icon: ReactNode
  label: string
}

export function HomepageFeatureBlock(props: HomepageFeatureBlockProps) {
  const { icon, label, children, className, ...restProps } = props
  return (
    <div className={twMerge('flex flex-col gap-2', className)} {...restProps}>
      <div className="flex flex-col items-center justify-center text-center">
        {icon}
      </div>
      <div className="text-center text-xl font-bold">{label}</div>
      <div>{children}</div>
    </div>
  )
}
