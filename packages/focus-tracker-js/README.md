# focus-tracker-js

[![NPM Version](https://img.shields.io/npm/v/%40michaeldrotar%2Ffocus-tracker-js.svg?style=flat)](https://www.npmjs.com/package/@michaeldrotar/focus-tracker-js)
[![NPM License](https://img.shields.io/npm/l/%40michaeldrotar%2Ffocus-tracker-js.svg?style=flat)](https://github.com/michaeldrotar/focus-tracker/blob/main/LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/%40michaeldrotar%2Ffocus-tracker-js.svg?style=flat)](https://www.npmjs.com/package/@michaeldrotar/focus-tracker-js)

Typescript-friendly Focus Tracker library for use with browsers or frameworks.

Enhances focus tracking with transitions and customization to make the experience more accessible for users and easier for developers.

See the video demonstration below.

[![Demonstration video](https://img.youtube.com/vi/W8CgSiQ7eJA/hqdefault.jpg)](https://youtu.be/W8CgSiQ7eJA)]

## Installation

Install with any package manager.
The focus tracker is a visual element that runs in your application so should usually be a production dependency.

```sh
npm install @michaeldrotar/focus-tracker-js
pnpm add @michaeldrotar/focus-tracker-js
bun add @michaeldrotar/focus-tracker-js
```

## Access

Import into your code

```ts
import { focusTracker } from '@michaeldrotar/focus-tracker-js'
```

or add the `dist/index.js` file to your scripts and access from the `window` object.

```html
<script src="/path/to/node_modules/@michaeldrotar/focus-tracker-js/dist/index.js"></script>
<script>
  window.focusTracker
</script>
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

### register(element: HTMLElement, configuration: FocusTrackerConfiguration)

For most users, register the `document.body` element and use the `configuration` to customize how your focus tracker should look.

```ts
focusTracker.register(document.body, {
  color: '#0ea5e9',
  thickness: 3,
})
```

Check advanced use cases for more.

### start()

Once registrations are defined, the server must be explicitly started.

```ts
focusTracker.start()
```

### stop()

The service may also be stopped at any time.

```
focusTracker.stop()
```

## Advanced Use Cases

The registration method allows for more advanced use cases to support sparse registrations and nested registrations. Below are some common examples.

### Compound Form Fields

If you have a compound form field like a search box where you want the outline around the input and its label, register the element with an overriding configuration to set its `target`.

```html
<div data-search-container class="rounded-md border">
  <label for="search-input">Search</label>
  <input id="search-input" />
</div>
```

```ts
focusTracker.register(
  document.querySelector('[data-search-container]', { target: 'self' }),
)
```

### Handling color contrast with nested configurations

This library comes preconfigured with a configuration that should match the browser's default appearance with the added benefit of the built-in transitions.

Most users will want to put their own branding on it. But if your brand is green and you have some elements with a green background then you'll lose contrast. Nested configurations allow making these changes more intuitive.

```html
<body>
  <div data-hero-banner style="background-color: green">
    <h1>My Hero</h1>
    <button>Read the docs</button>
  </div>
</body>
```

```ts
focusTracker.register(document.body, {
  color: 'green',
  offset: 1,
  thickness: 3,
})
focusTracker.register(document.querySelector('[data-hero-banner]'), {
  color: 'white',
})
```

Now when focus moves to the `[data-hero-banner]` element or one of its children, the color will transition from green to white.
