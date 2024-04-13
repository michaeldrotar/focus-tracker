'use client'

import { RefObject, useId } from 'react'

export type TestComponentsProps = {
  rootRef?: RefObject<HTMLDivElement>
}

export function TestComponents({ rootRef }: TestComponentsProps) {
  const id = useId()
  return (
    <div
      ref={rootRef}
      style={{ height: '200px', overflow: 'auto', maxWidth: '200px' }}
    >
      <div>
        <label htmlFor={`${id}-text`}>Text Input</label>
        <input type="text" id={`${id}-text`} style={{ width: '250px' }} />
      </div>
      <div>
        <label htmlFor={`${id}-dropdown`}>Dropdown</label>
        <select id={`${id}-dropdown`}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </div>
      <div>
        {[1, 2, 3].map((num) => {
          return (
            <div key={num}>
              <input
                type="checkbox"
                name={`${id}-checkbox`}
                id={`${id}-checkbox-${num}`}
              />
              <label htmlFor={`${id}-checkbox-${num}`}>Checkbox {num}</label>
            </div>
          )
        })}
      </div>
      <div>
        {[1, 2, 3, 4, 5].map((num) => {
          return (
            <div key={num}>
              <input
                type="radio"
                name={`${id}-radio`}
                id={`${id}-radio-${num}`}
              />
              <label htmlFor={`${id}-radio-${num}`}>Radio {num}</label>
            </div>
          )
        })}
      </div>
      <div>
        <label htmlFor={`${id}-textarea`}>Textarea</label>
        <textarea id={`${id}-textarea`} />
      </div>
      <style>
        {`
        .foo:focus {
          outline: 5px solid -webkit-focus-ring-color;
        }
        `}
      </style>
      <div
        style={{
          backgroundColor: '#eee',
          padding: '8px',
        }}
      >
        <div
          style={{ backgroundColor: '#ccc', overflowY: 'clip', height: '10px' }}
        >
          <input
            className="foo"
            type="text"
            style={{ position: 'absolute', right: '0' }}
          />
        </div>
      </div>
    </div>
  )
}
