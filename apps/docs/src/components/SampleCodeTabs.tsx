import type { Props as TabsProps } from '@theme/Tabs'
import type { Props as TabItemProps } from '@theme/TabItem'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import { Children, isValidElement, useMemo } from 'react'

export type SampleCodeTabsProps = Pick<TabsProps, 'children'>
export type SampleCodeTabItemProps = Pick<TabItemProps, 'children'>

function getTabItemConfig(tabItem: unknown) {
  if (!isValidElement(tabItem)) return
  switch (tabItem.type) {
    case TypescriptTabItem:
      return { label: 'Typescript', value: 'typescript' }
    case ReactTabItem:
      return { label: 'React', value: 'react' }
  }
}

function _SampleCodeTabs({ children }: SampleCodeTabsProps) {
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
  return <Tabs groupId="language">{items}</Tabs>
}

function TypescriptTabItem({ children }: SampleCodeTabItemProps) {
  return children
}

function ReactTabItem({ children }: SampleCodeTabItemProps) {
  return children
}

export const SampleCodeTabs = Object.assign(_SampleCodeTabs, {
  Typescript: TypescriptTabItem,
  React: ReactTabItem,
})
