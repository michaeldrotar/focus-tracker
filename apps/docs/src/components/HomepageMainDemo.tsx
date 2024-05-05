import type { RefObject } from 'react'
import { DemoBox } from './demo/DemoBox'
import { DemoButton } from './demo/DemoButton'
import { DemoHero } from './demo/DemoHero'
import { DemoWindow } from './demo/DemoWindow'

export type HomepageMainDemoProps = {
  rootRef?: RefObject<HTMLElement>
}

export function HomepageMainDemo(props: HomepageMainDemoProps) {
  return (
    <DemoWindow
      actions={[
        { action: 'focus', target: '[data-demo-logo]' },
        { action: 'focus', target: '[data-demo-circle-1]' },
        { action: 'focus', target: '[data-demo-circle-2]' },
        { action: 'focus', target: '[data-demo-primary]' },
        { action: 'open-list', target: '[data-demo-primary]' },
        { action: 'select-item', which: 2 },
        { action: 'select-item', which: 3 },
        { action: 'click-item', which: 3 },
        { action: 'focus', target: '[data-demo-secondary]' },
        { action: 'blur' },
      ]}
      className="max-w-full"
      {...props}
    >
      <DemoBox
        style={{
          alignItems: 'center',
          backgroundColor: 'rgb(var(--theme-color-neutral-100))',
          display: 'flex',
          height: '2rem',
          justifyContent: 'space-between',
          padding: '0 0.5rem',
        }}
      >
        <DemoBox
          data-demo-logo
          style={{
            backgroundColor: 'rgb(var(--theme-color-neutral-400))',
            height: '1rem',
            width: '4rem',
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <DemoButton data-demo-circle-1 shape="circle" />
          <DemoButton data-demo-circle-2 shape="circle" />
        </div>
      </DemoBox>
      <DemoHero
        primaryButton={<DemoButton data-demo-primary />}
        secondaryButton={<DemoButton data-demo-secondary outlined />}
      />
    </DemoWindow>
  )
}
