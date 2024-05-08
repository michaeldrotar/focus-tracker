import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '../theme/Heading'
import { HomepageMainDemo } from './HomepageMainDemo'
import { CheckBadgeIcon } from './icons/CheckBadgeIcon'
import { HomepageFrameworkList } from './HomepageFrameworkList'

export function HomepageHeroBanner() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className="overflow-hidden py-16 text-center">
      <div className="container px-8">
        <Heading
          as="h1"
          className="from-primary-500 to-tertiary-500 m-0 inline-block bg-gradient-to-r bg-clip-text text-6xl text-transparent sm:text-7xl"
        >
          {siteConfig.title}
        </Heading>
        <div className="mt-12 flex flex-col items-start justify-center gap-16 sm:flex-row sm:text-left">
          <div className="flex flex-auto flex-col items-center justify-center sm:items-start">
            <p className="m-0 text-3xl">{siteConfig.tagline}</p>
            <p className="m-0 text-lg text-neutral-700">
              Say goodbye to inconsistent and forgotten focus states. Delight
              your users as they tab through forms, navigation, and the rest of
              your application with an accessible focus indicator that matches
              your brand.
            </p>
            <ul className="m-0 mt-4 w-fit list-none space-y-2 p-0 text-left text-xl leading-6">
              <li className="flex gap-3">
                <CheckBadgeIcon className="h-6 w-6 flex-none" />
                Open source, free for all.
              </li>
              <li className="flex gap-3">
                <CheckBadgeIcon className="h-6 w-6 flex-none" />
                No external dependencies.
              </li>
              <li className="flex gap-3">
                <CheckBadgeIcon className="h-6 w-6 flex-none" />
                Works in any framework.
              </li>
            </ul>
            <div className="mt-4 flex items-center justify-center sm:justify-start">
              <Link
                className="button button--secondary button--lg"
                to="/get-started"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="flex max-w-full flex-auto flex-col justify-center">
            <HomepageMainDemo />
            <HomepageFrameworkList className="mt-8" />
          </div>
        </div>
      </div>
    </header>
  )
}
