import type { HTMLAttributes, ReactElement } from 'react'
import Link from '@docusaurus/Link'
import { twMerge } from 'tailwind-merge'

export type HomepageFrameworkListItemProps = Pick<
  HTMLAttributes<HTMLElement>,
  'className'
> & {
  label?: string
  href?: string
  icon: (props: { className: string }) => ReactElement
}

export function HomepageFrameworkListItem(
  props: HomepageFrameworkListItemProps,
) {
  const { className, href, icon, label, ...restProps } = props
  const IconComponent = icon
  return (
    <li className="block">
      <Link
        aria-label={label}
        className={twMerge('block rounded-lg p-2 text-current', className)}
        href={href}
        {...restProps}
      >
        <IconComponent className="block h-8 w-8" />
      </Link>
    </li>
  )
}
