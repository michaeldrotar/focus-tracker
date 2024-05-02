import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { useEffect, useRef } from 'react'
import { createOtherFocusTracker } from '@michaeldrotar/focus-tracker-js/createOtherFocusTracker'
import Heading from '@site/src/theme/Heading'
import styles from './index.module.css'

function HomepageHeader() {
  const demoWindowRef = useRef<HTMLDivElement>(null)
  const demoLogoRef = useRef<HTMLDivElement>(null)
  const demoButton1Ref = useRef<HTMLDivElement>(null)
  const demoButton2Ref = useRef<HTMLDivElement>(null)
  const demoDropdownRef = useRef<HTMLDivElement>(null)
  const demoDropdownFlyoutRef = useRef<HTMLDivElement>(null)
  const demoDropdownFlyoutItem1 = useRef<HTMLDivElement>(null)
  const demoDropdownFlyoutItem2 = useRef<HTMLDivElement>(null)
  const demoDropdownFlyoutItem3 = useRef<HTMLDivElement>(null)
  const demoSubmitRef = useRef<HTMLDivElement>(null)
  const { siteConfig } = useDocusaurusContext()

  useEffect(() => {
    const demoWindow = demoWindowRef.current
    const logo = demoLogoRef.current
    const button1 = demoButton1Ref.current
    const button2 = demoButton2Ref.current
    const dropdown = demoDropdownRef.current
    const dropdownFlyout = demoDropdownFlyoutRef.current
    const dropdownFlyoutItem1 = demoDropdownFlyoutItem1.current
    const dropdownFlyoutItem2 = demoDropdownFlyoutItem2.current
    const dropdownFlyoutItem3 = demoDropdownFlyoutItem3.current
    const submit = demoSubmitRef.current

    if (
      !demoWindow ||
      !logo ||
      !button1 ||
      !button2 ||
      !dropdown ||
      !dropdownFlyout ||
      !dropdownFlyoutItem1 ||
      !dropdownFlyoutItem2 ||
      !dropdownFlyoutItem3 ||
      !submit
    ) {
      return
    }

    const focusTracker = createOtherFocusTracker({
      color: 'var(--color-rose-500)',
      thickness: 1,
      // parent: demoWindow,
    })

    const animate = (
      element: HTMLElement,
      className: string,
      timeout: number,
    ) => {
      element.classList.add(className)
      setTimeout(() => {
        element.classList.remove(className)
      }, timeout)
    }

    const steps: { fn: () => void; delay: number }[] = [
      {
        fn: () => {
          focusTracker.focus(logo)
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.focus(button1)
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.focus(button2)
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.focus(dropdown)
        },
        delay: 1000,
      },
      {
        fn: () => {
          animate(dropdown, styles.heroDemoClicked, 1000)
        },
        delay: 1000,
      },
      {
        fn: () => {
          animate(dropdownFlyout, styles.heroDemoDropdownFlyoutOpen, 3000)
        },
        delay: 0,
      },
      {
        fn: () => {
          focusTracker.focus(dropdownFlyout)
        },
        delay: 0,
      },
      {
        fn: () => {
          animate(
            dropdownFlyoutItem1,
            styles.heroDemoDropdownFlyoutItemActive,
            1000,
          )
        },
        delay: 1000,
      },
      {
        fn: () => {
          animate(
            dropdownFlyoutItem2,
            styles.heroDemoDropdownFlyoutItemActive,
            1000,
          )
        },
        delay: 1000,
      },
      {
        fn: () => {
          animate(
            dropdownFlyoutItem3,
            styles.heroDemoDropdownFlyoutItemActive,
            1000,
          )
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.focus(dropdown)
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.focus(submit)
        },
        delay: 1000,
      },
      {
        fn: () => {
          focusTracker.blur()
        },
        delay: 1000,
      },
    ]

    let index = 0
    let timeout: NodeJS.Timeout
    const execute = () => {
      const step = steps[index]
      index = (index + 1) % steps.length
      step.fn()
      timeout = setTimeout(execute, step.delay)
    }

    execute()

    return () => {
      clearTimeout(timeout)
      focusTracker.destroy()
    }
  })

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Heading as="h1" className={styles.heroBannerTitle}>
              {siteConfig.tagline}
            </Heading>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/get-started"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className={styles.heroDemoBackdrop}>
            <div className={styles.heroDemoWindow} ref={demoWindowRef}>
              <div className={styles.heroDemoBanner}>
                <div className={styles.heroDemoBannerLogo} ref={demoLogoRef} />
                <div
                  className={styles.heroDemoBannerButton}
                  ref={demoButton1Ref}
                />
                <div
                  className={styles.heroDemoBannerButton}
                  ref={demoButton2Ref}
                />
              </div>
              <div className={styles.heroDemoContent}>
                <div
                  className={styles.heroDemoDropdown}
                  ref={demoDropdownRef}
                />
                <div
                  className={styles.heroDemoDropdownFlyout}
                  ref={demoDropdownFlyoutRef}
                >
                  <div
                    className={styles.heroDemoDropdownFlyoutItem}
                    ref={demoDropdownFlyoutItem1}
                  />
                  <div
                    className={styles.heroDemoDropdownFlyoutItem}
                    ref={demoDropdownFlyoutItem2}
                  />
                  <div
                    className={styles.heroDemoDropdownFlyoutItem}
                    ref={demoDropdownFlyoutItem3}
                  />
                  <div className={styles.heroDemoDropdownFlyoutItem} />
                  <div className={styles.heroDemoDropdownFlyoutItem} />
                </div>
                <div className={styles.heroDemoSubmit} ref={demoSubmitRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
    </Layout>
  )
}
