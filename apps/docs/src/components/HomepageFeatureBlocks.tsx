import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { HomepageFeatureBlock } from './HomepageFeatureBlock'
import { UserGroupOutlinedIcon } from './icons/UserGroupOutlinedIcon'
import { PaintbrushOutlinedIcon } from './icons/PaintbrushOutlinedIcon'
import { CodeBracketOutlinedIcon } from './icons/CodeBracketOutlinedIcon'

export type HomepageFeatureBlocksProps = Pick<
  HTMLAttributes<HTMLElement>,
  'className'
>

export function HomepageFeatureBlocks(props: HomepageFeatureBlocksProps) {
  const { className, ...restProps } = props
  return (
    <section className={twMerge('py-8', className)} {...restProps}>
      <div className="container px-8">
        <ul className="m-0 flex list-none flex-col gap-8 p-0 sm:flex-row">
          <li className="flex-1">
            <HomepageFeatureBlock
              icon={
                <UserGroupOutlinedIcon className="text-primary-500 h-16 w-16" />
              }
              label="For Users"
            >
              <p>
                A highly visible focus indicator to make keyboard navigation
                enjoyable.
              </p>
            </HomepageFeatureBlock>
          </li>
          <li className="flex-1">
            <HomepageFeatureBlock
              icon={
                <PaintbrushOutlinedIcon className="text-secondary-500 h-16 w-16" />
              }
              label="For Designers"
            >
              <p>
                Customization to match your brand. Never worry about focus
                states again.
              </p>
            </HomepageFeatureBlock>
          </li>
          <li className="flex-1">
            <HomepageFeatureBlock
              icon={
                <CodeBracketOutlinedIcon className="text-tertiary-500 h-16 w-16" />
              }
              label="For Developers"
            >
              <p>
                A simple integration with flexibility where you need it. Works
                everywhere.
              </p>
            </HomepageFeatureBlock>
          </li>
        </ul>
      </div>
    </section>
  )
}
