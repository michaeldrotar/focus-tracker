# React Focus Tracker

[![NPM Version](https://img.shields.io/npm/v/%40michaeldrotar%2Freact-focus-tracker.svg?style=flat)](https://www.npmjs.com/package/@michaeldrotar/react-focus-tracker)
[![NPM License](https://img.shields.io/npm/l/%40michaeldrotar%2Freact-focus-tracker.svg?style=flat)](https://github.com/michaeldrotar/focus-tracker/blob/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/%40michaeldrotar%2Freact-focus-tracker.svg?style=flat)](https://www.npmjs.com/package/@michaeldrotar/react-focus-tracker)

Typescript-friendly Focus Tracker library for use with React.

Enhances focus tracking with transitions and customization to make the experience more accessible for users and easier for developers.

See the video demonstration below.

[![Demonstration video](https://img.youtube.com/vi/W8CgSiQ7eJA/hqdefault.jpg)](https://youtu.be/W8CgSiQ7eJA)]

## Installation

Install with any package manager.
The focus tracker is a visual element that runs in your application so should usually be a production dependency.

```sh
npm install @michaeldrotar/react-focus-tracker
pnpm add @michaeldrotar/react-focus-tracker
bun add @michaeldrotar/react-focus-tracker
```

## Access

Import into your code

```ts
import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'
```

## Next.js App Router

If the component is used directly, Next.js may throw an error that it's not a client component. It is recommended to create a small wrapper around it to fix this.

```tsx
'use client'

import {
  FocusTrackerRegistration,
  FocusTrackerRegistrationProps,
} from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'

export function FocusTracker(props: FocusTrackerRegistrationProps) {
  return <FocusTrackerRegistration {...props} />
}
```

## Usage

### FocusTrackerConfiguration

The configuration object allows customization of how your focus tracker looks. The options are limited to allow branding while focusing on the importance of following established best practices for a recognizable focus indication.

| Property  | Type                                | Description                                                                                                                                                                                                                                                               |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| boxShadow | `string`                            | Provides access to the `box-shadow` css property so multiple inner and outer shadows can simply be defined. Use `currentColor` to refer to the `configuration.color` property for better re-use.                                                                          |
| color     | `string`                            | Sets the main color of the the focus tracker. By default, uses the browser's default focus styles. Any valid css value may be used, including helpers like `color-mix()`.                                                                                                 |
| offset    | `string \| number`                  | Sets an offset distance. By default, the offset is `0` so that the tracker tightly wraps the edges of the target element. A negative offset will move the tracker inside the bounds of the element. A string may be used to include css units like `"0.1rem"` or `"3px"`. |
| target    | `'self' \| 'target' \| HTMLElement` | Sets where the focus tracker's indicator will be positioned. By default, uses `'target'` as the target of the focus event. May use `'self'` for nested configurations so children show focus on itself, or may pass any other element.                                    |
| thickness | `string \| number`                  | Sets how thick the focus tracker's outline should be. By default, uses the browser's default thickness. A string may be used to include css units like `"0.1rem"` or `"3px"`.                                                                                             |

### FocusTrackerRegistration(configuration: FocusTrackerConfiguration)

For most users, wrap this component around the `<body>` and use the `configuration` to customize how your focus tracker should look.

```tsx
return (
  <FocusTrackerRegistration color="#0ea5e9" thickness={3}>
    <body>...</body>
  </FocusTrackerRegistration>
)
```

Check advanced use cases for more.

## Advanced Use Cases

The registration method allows for more advanced use cases to support sparse registrations and nested registrations. Below are some common examples.

### Compound Form Fields

If you have a compound form field like a search box where you want the outline around the input and its label, register the element with an overriding configuration to set its `target`.

```tsx
return (
  <FocusTrackerRegistration target="self">
    <div class="rounded-md border">
      <label for="search-input">Search</label>
      <input id="search-input" />
    </div>
  </FocusTrackerRegistration>
)
```

### Handling color contrast with nested configurations

This library comes preconfigured with a configuration that should match the browser's default appearance with the added benefit of the built-in transitions.

Most users will want to put their own branding on it. But if your brand is green and you have some elements with a green background then you'll lose contrast. Nested configurations allow making these changes more intuitive.

```tsx
return (
  <FocusTrackerRegistration color="green" offset={1} thickness={3}>
    <body>
      <FocusTrackerRegistration color="white">
        <div style="background-color: green">
          <h1>My Hero</h1>
          <button>Read the docs</button>
        </div>
      </FocusTrackerRegistration>
    </body>
  </FocusTrackerRegistration>
)
```

Now when focus moves to the hero banner or one of its children, the color will transition from green to white.
