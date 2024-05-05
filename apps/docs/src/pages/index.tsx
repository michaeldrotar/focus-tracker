import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { HomepageHeroBanner } from '../components/HomepageHeroBanner'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeroBanner />
    </Layout>
  )
}
