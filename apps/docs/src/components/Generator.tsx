import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker'
import CodeBlock from '@theme/CodeBlock'
import dedent from 'dedent'
import type { FocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js'
import type { HTMLAttributes } from 'react'
import { useState } from 'react'
import { HomepageMainDemo } from './HomepageMainDemo'
import { SampleCodeTabs } from './SampleCodeTabs'

export type GeneratorProps = Pick<HTMLAttributes<HTMLElement>, 'className'>

function buildJsConfigString(userConfig: Partial<FocusTrackerConfiguration>) {
  let configString = ''
  const indent = '  '
  if (userConfig.color) {
    configString += `${indent}color: '${userConfig.color}',\n`
  }
  if (userConfig.thickness && userConfig.thickness !== 1) {
    configString += `${indent}thickness: ${userConfig.thickness},\n`
  }
  if (userConfig.offset) {
    configString += `${indent}offset: ${userConfig.offset},\n`
  }
  if (userConfig.boxShadow && userConfig.boxShadow !== 'none') {
    configString += `${indent}boxShadow: '${userConfig.boxShadow}',\n`
  }
  if (configString !== '') {
    configString = `\n${configString}`
  }
  return configString
}

function buildReactConfigString(
  userConfig: Partial<FocusTrackerConfiguration>,
) {
  let configString = ''
  if (userConfig.color) {
    configString += ` color="${userConfig.color}"`
  }
  if (userConfig.thickness && userConfig.thickness !== 1) {
    configString += ` thickness={${userConfig.thickness}}`
  }
  if (userConfig.offset) {
    configString += ` offset={${userConfig.offset}}`
  }
  if (userConfig.boxShadow && userConfig.boxShadow !== 'none') {
    configString += ` boxShadow="${userConfig.boxShadow}"`
  }
  return configString
}

export function Generator(props: GeneratorProps) {
  // need to merge our own default config so the demo is true to a new install that doesn't
  // inherit from the doc's own config
  const defaultConfig: FocusTrackerConfiguration = {
    color: '-webkit-focus-ring-color',
    thickness: 1,
    offset: 0,
    boxShadow: 'none',
    target: 'target',
  }
  const [userConfig, setUserConfig] = useState<
    Partial<FocusTrackerConfiguration>
  >({ thickness: 1, offset: 0, boxShadow: 'none' })

  const jsConfigString = buildJsConfigString(userConfig)
  const reactConfigString = buildReactConfigString(userConfig)

  return (
    <div {...props}>
      <div className="flex w-full flex-col gap-8 sm:flex-row">
        <div className="flex-auto">
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <div className="mt-2">
              <div>
                <label className="font-bold text-neutral-700" htmlFor="color">
                  Color
                </label>
              </div>
              <input
                id="color"
                onChange={(event) => {
                  setUserConfig((config) => {
                    const value = event.target.value
                    if (value === '') {
                      delete config.color
                      return config
                    }
                    return { ...config, color: value }
                  })
                }}
                type="color"
                value={userConfig.color}
              />
            </div>
            <div className="mt-2">
              <div>
                <label
                  className="font-bold text-neutral-700"
                  htmlFor="thickness"
                >
                  Thickness
                </label>
              </div>
              <input
                id="thickness"
                min={0}
                onChange={(event) => {
                  setUserConfig((config) => {
                    const value = parseInt(event.target.value)
                    if (isNaN(value)) {
                      delete config.thickness
                      return config
                    }
                    return { ...config, thickness: value }
                  })
                }}
                type="number"
                value={userConfig.thickness}
              />
            </div>
            <div className="mt-2">
              <div>
                <label className="font-bold text-neutral-700" htmlFor="offset">
                  Offset
                </label>
              </div>
              <input
                id="offset"
                onChange={(event) => {
                  setUserConfig((config) => {
                    const value = parseInt(event.target.value)
                    if (isNaN(value)) {
                      delete config.offset
                      return config
                    }
                    return { ...config, offset: value }
                  })
                }}
                type="number"
                value={userConfig.offset}
              />
            </div>
            <div className="mt-2">
              <div>
                <label
                  className="font-bold text-neutral-700"
                  htmlFor="boxShadow"
                >
                  Box Shadow
                </label>
              </div>
              <input
                id="boxShadow"
                onChange={(event) => {
                  setUserConfig((config) => {
                    const value = event.target.value
                    if (value === '') {
                      delete config.boxShadow
                      return config
                    }
                    return { ...config, boxShadow: value }
                  })
                }}
                type="text"
                value={userConfig.boxShadow}
              />
            </div>
          </form>
        </div>
        <div className="flex-auto">
          <FocusTrackerRegistration
            refProperty="rootRef"
            {...defaultConfig}
            {...userConfig}
          >
            <HomepageMainDemo />
          </FocusTrackerRegistration>
        </div>
      </div>
      <SampleCodeTabs className="mt-8">
        <SampleCodeTabs.Typescript>
          <CodeBlock language="typescript">
            {dedent(`
              import { registerFocusTrackerConfiguration } from '@michaeldrotar/focus-tracker-js/registerFocusTrackerConfiguration'
              import { startUserFocusTracker } from '@michaeldrotar/focus-tracker-js/startUserFocusTracker'

              registerFocusTrackerConfiguration(document.body, {{config}})
              startUserFocusTracker()
            `).replace('{config}', jsConfigString)}
          </CodeBlock>
        </SampleCodeTabs.Typescript>
        <SampleCodeTabs.React>
          <CodeBlock language="tsx">
            {dedent(`
              import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'
              import { UserFocusTracker } from '@michaeldrotar/react-focus-tracker/UserFocusTracker'

              function App() {
                return (
                  <FocusTrackerRegistration${reactConfigString}>
                    <body>
                      // ...
                    </body>
                  </FocusTrackerRegistration>
                  <UserFocusTracker />
                )
              }
            `)}
          </CodeBlock>
        </SampleCodeTabs.React>
      </SampleCodeTabs>
    </div>
  )
}
