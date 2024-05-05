import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Heading from '../theme/Heading'
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
        <Heading as="h2" className="text-center text-3xl font-bold">
          Use Cases
        </Heading>
        <ul className="mt-8 flex flex-col gap-8 sm:flex-row">
          <li className="flex-1">
            <HomepageFeatureBlock
              icon={
                <UserGroupOutlinedIcon className="text-primary-500 h-16 w-16" />
              }
              label="For Users"
            >
              <p>
                Highly visible focus states that move between elements so you
                never lose sight of it.
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
                Design once, use everywhere. Only visible when needed. Never
                worry about focus states again.
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
                Build a global focus state with the flexibility where you need
                it.
              </p>
            </HomepageFeatureBlock>
          </li>
        </ul>
      </div>
    </section>
  )
}
