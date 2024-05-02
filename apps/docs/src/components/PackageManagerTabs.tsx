import type { Props as TabsProps } from '@theme/Tabs'
import type { Props as TabItemProps } from '@theme/TabItem'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import { Children, isValidElement, useMemo } from 'react'

export type PackageManagerTabsProps = Pick<TabsProps, 'children'>
export type PackageManagerTabItemProps = Pick<TabItemProps, 'children'>

function getTabItemConfig(tabItem: unknown) {
  if (!isValidElement(tabItem)) return
  switch (tabItem.type) {
    case NpmTabItem:
      return { label: 'npm', value: 'npm' }
    case YarnTabItem:
      return { label: 'yarn', value: 'yarn' }
    case PnpmTabItem:
      return { label: 'pnpm', value: 'pnpm' }
  }
}

function _PackageManagerTabs({ children }: PackageManagerTabsProps) {
  const items = useMemo(() => {
    return Children.toArray(children).map((child) => {
      const config = getTabItemConfig(child)
      if (!config) return null
      return (
        // Tabs component errors if any children are not directly TabItem components
        // so need to convert the indirection away
        <TabItem key={config.value} {...config}>
          {child}
        </TabItem>
      )
    })
  }, [children])
  return <Tabs groupId="bundler">{items}</Tabs>
}

function NpmTabItem({ children }: PackageManagerTabItemProps) {
  return children
}

function YarnTabItem({ children }: PackageManagerTabItemProps) {
  return children
}

function PnpmTabItem({ children }: PackageManagerTabItemProps) {
  return children
}

export const PackageManagerTabs = Object.assign(_PackageManagerTabs, {
  Npm: NpmTabItem,
  Yarn: YarnTabItem,
  Pnpm: PnpmTabItem,
})
