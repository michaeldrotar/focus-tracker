import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@site/src/theme/Heading'

import styles from './index.module.css'
import { useEffect, useRef } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'

function HomepageHeader() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { siteConfig } = useDocusaurusContext()

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    let index = 0
    const children = heading.children
    const focusTracker = createOtherFocusTracker({
      color: 'var(--ifm-color-primary-darkest)',
      // boxShadow: '0 0 8px 4px currentColor',
      offset: 5,
      thickness: 3,
    })
    const interval = setInterval(() => {
      const child = children[index]
      if (child && child instanceof HTMLElement) {
        focusTracker.focus(child)
      } else {
        focusTracker.blur()
      }
      index = (index + 1) % (children.length + 1)
    }, 1500)

    return () => {
      clearInterval(interval)
      focusTracker.destroy()
    }
  }, [headingRef])

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading rootRef={headingRef} as="h1" className="hero__title">
          {siteConfig.title.split(/\s+/).map((word, index) => {
            return (
              <>
                <span key={index}>{word}</span>{' '}
              </>
            )
          })}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
