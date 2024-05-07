import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { GlobeAltOutlinedIcon } from './icons/GlobeAltOutlinedIcon'
import { ReactIcon } from './icons/ReactIcon'
import { HomepageFrameworkListItem } from './HomepageFrameworkListItem'
import { NodeJsIcon } from './icons/NodeJsIcon'

export type HomepageFrameworkListProps = Pick<
  HTMLAttributes<HTMLElement>,
  'className'
>

export function HomepageFrameworkList(props: HomepageFrameworkListProps) {
  const { className, ...restProps } = props
  return (
    <ul
      className={twMerge(
        `m-0 mt-8 flex list-none flex-row justify-center gap-4 bg-transparent p-0 text-neutral-400`,
        className,
      )}
      {...restProps}
    >
      <HomepageFrameworkListItem
        className="hover:text-web-foreground focus-visible:text-web-foreground"
        href="/get-started/browser"
        icon={GlobeAltOutlinedIcon}
        label="Browser"
      />
      <HomepageFrameworkListItem
        className="hover:text-nodejs-foreground focus-visible:text-nodejs-foreground"
        href="/get-started/module"
        icon={NodeJsIcon}
        label="Module"
      />
      <HomepageFrameworkListItem
        className="hover:text-react-foreground focus-visible:text-react-foreground"
        href="/get-started/react"
        icon={ReactIcon}
        label="React"
      />
    </ul>
  )
}
