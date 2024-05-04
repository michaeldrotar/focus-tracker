import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@site/src/theme/Heading'
import { HomepageMainDemo } from '../components/HomepageMainDemo'
import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.siteTitle}>
          {siteConfig.title}
        </Heading>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Heading as="h2" className={styles.heroBannerTitle}>
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
          <div className={styles.heroDemo}>
            <HomepageMainDemo />
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
