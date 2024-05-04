import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js'
import { useMemo, useState, type ReactNode } from 'react'
import styles from './ConfigurationSetting.module.css'
import type { DemoWindowAction } from './demo/DemoWindow'
import { DemoWindow } from './demo/DemoWindow'
import { DemoButton } from './demo/DemoButton'

export function ConfigurationSetting({ children }: { children?: ReactNode }) {
  return <section className={styles.ConfigurationSetting}>{children}</section>
}

export function ConfigurationSettingContent({
  children,
}: {
  children?: ReactNode
}) {
  return <div className={styles.ConfigurationSettingContent}>{children}</div>
}

export function ConfigurationSettingDemo({
  children,
}: {
  children?: ReactNode
}) {
  return <div className={styles.ConfigurationSettingDemo}>{children}</div>
}

export type ConfigurationSettingPropertyDemoProps = {
  name: keyof FocusTrackerConfiguration
  values: (string | number)[]
}

export function ConfigurationSettingPropertyDemo(
  props: ConfigurationSettingPropertyDemoProps,
) {
  const { name, values } = props
  const [label, setLabel] = useState(values[0].toString())
  const actions: DemoWindowAction[] = useMemo(() => {
    return values.map((value) => {
      return {
        action: 'config',
        config: { [name]: value },
      }
    })
  }, [name, values])
  return (
    <DemoWindow
      actions={actions}
      centerContent
      delayInMs={2000}
      onAction={(action) => {
        if (action.action === 'config') {
          const value = action.config[name]
          if (typeof value === 'string' || typeof value === 'number') {
            setLabel(value.toString())
          }
        }
      }}
      onInit={(focusTracker, demoElement) => {
        focusTracker.configure({
          boxShadow: 'none',
          color: '-webkit-focus-ring-color',
          offset: 0,
          target: 'target',
          thickness: 1,
        })

        const target = demoElement.querySelector('[data-demo-1]')
        if (target && target instanceof HTMLElement) {
          focusTracker.focus(target)
        }
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: '1rem' }}>
        <DemoButton colored data-demo-1 />
      </div>
      <p
        style={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          right: '1rem',
          marginTop: '1.2rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          lineHeight: '1.2',
        }}
      >
        {label.split(',').map((part) => (
          <div key={part}>{part}</div>
        ))}
      </p>
    </DemoWindow>
  )
}
