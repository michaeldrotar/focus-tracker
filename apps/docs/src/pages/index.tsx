import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { HomepageHeroBanner } from '../components/HomepageHeroBanner'
import { HomepageFeatureBlocks } from '../components/HomepageFeatureBlocks'

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeroBanner />
      <HomepageFeatureBlocks />
      <div className="h-24" />
    </Layout>
  )
}
