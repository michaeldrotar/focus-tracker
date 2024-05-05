import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '../theme/Heading'
import { HomepageMainDemo } from './HomepageMainDemo'

export function HomepageHeroBanner() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className="overflow-hidden py-16 text-center">
      <div className="container">
        <Heading
          as="h1"
          className="from-primary-500 to-tertiary-500 inline-block bg-gradient-to-r bg-clip-text text-6xl text-transparent sm:text-7xl"
        >
          {siteConfig.title}
        </Heading>
        <div className="mt-12 flex flex-col items-center justify-center gap-16 sm:flex-row">
          <div className="flex-auto">
            <Heading as="h2" className="text-4xl">
              {siteConfig.tagline}
            </Heading>
            <div className="mt-4 flex items-center justify-center">
              <Link
                className="button button--secondary button--lg"
                to="/get-started"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="flex max-w-full flex-auto justify-center">
            <HomepageMainDemo />
          </div>
        </div>
      </div>
    </header>
  )
}
