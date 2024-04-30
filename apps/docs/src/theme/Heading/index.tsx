import type { LegacyRef } from 'react'
import React from 'react'
import { clsx } from 'clsx'
import { translate } from '@docusaurus/Translate'
import { useThemeConfig } from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'
import useBrokenLinks from '@docusaurus/useBrokenLinks'
import type { Props } from '@theme/Heading'
import styles from './styles.module.css'

type ExtendedProps = {
  rootRef?: LegacyRef<HTMLHeadingElement>
}

export default function Heading({
  as: As,
  id,
  rootRef,
  ...props
}: Props & ExtendedProps): JSX.Element {
  const brokenLinks = useBrokenLinks()
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig()
  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return <As ref={rootRef} {...props} id={undefined} />
  }

  brokenLinks.collectAnchor(id)

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  )

  return (
    <As
      ref={rootRef}
      {...props}
      className={clsx(
        'anchor',
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className,
      )}
      id={id}
    >
      {props.children}
      <Link
        aria-label={anchorTitle}
        className="hash-link"
        title={anchorTitle}
        to={`#${id}`}
      >
        &#8203;
      </Link>
    </As>
  )
}
