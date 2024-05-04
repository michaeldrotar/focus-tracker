import { DemoBox } from './demo/DemoBox'
import { DemoButton } from './demo/DemoButton'
import { DemoHero } from './demo/DemoHero'
import { DemoWindow } from './demo/DemoWindow'

export function HomepageMainDemo() {
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
    >
      <DemoBox
        style={{
          alignItems: 'center',
          backgroundColor: 'var(--theme-color-neutral-100)',
          display: 'flex',
          height: '2rem',
          justifyContent: 'space-between',
          padding: '0 0.5rem',
        }}
      >
        <DemoBox
          data-demo-logo
          style={{
            backgroundColor: 'var(--theme-color-neutral-400)',
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
