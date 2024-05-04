import { useState } from 'react'
import { DemoBox } from './demo/DemoBox'
import { DemoWindow } from './demo/DemoWindow'

export function ConfigurationTargetDemo() {
  const [label, setLabel] = useState('target')
  return (
    <DemoWindow
      actions={[
        { action: 'focus', target: '[data-demo-target]' },
        { action: 'focus', target: '[data-demo-parent]' },
        { action: 'focus', target: 'div' },
      ]}
      onAction={(action) => {
        if (action.action === 'focus') {
          if (action.target === 'div') {
            setLabel('document.body')
          } else if (action.target === '[data-demo-parent]') {
            setLabel('"self"')
          } else if (action.target === '[data-demo-target]') {
            setLabel('"target"')
          }
        }
      }}
      onInit={(focusTracker, rootElement) => {
        const target = rootElement.querySelector('[data-demo-target]')
        if (target && target instanceof HTMLElement) {
          focusTracker.focus(target)
        }
      }}
    >
      <DemoBox
        style={{
          color: 'var(--theme-color-neutral-600)',
          fontSize: '0.8rem',
          padding: '0.5rem',
        }}
      >
        <DemoBox
          data-demo-parent
          style={{
            border: '2px dashed var(--theme-color-neutral-300)',
            backgroundColor: 'var(--theme-color-neutral-200)',
            padding: '0.5rem',
          }}
        >
          Registered Element
          <DemoBox
            data-demo-target
            style={{
              border: '2px dashed var(--theme-color-neutral-400)',
              backgroundColor: 'var(--theme-color-neutral-300)',
              marginTop: '0.5rem',
              padding: '0.5rem',
            }}
          >
            Event Target
          </DemoBox>
        </DemoBox>
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '1rem',
            right: '1rem',
            marginTop: '2.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            lineHeight: '1.2',
          }}
        >
          {label.split(',').map((part) => (
            <div key={part}>{part}</div>
          ))}
        </p>
      </DemoBox>
    </DemoWindow>
  )
}