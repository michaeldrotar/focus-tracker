'use client'

import { RefObject, useId } from 'react'

export type TestComponentsProps = {
  rootRef?: RefObject<HTMLDivElement>
}

export function TestComponents({ rootRef }: TestComponentsProps) {
  const id = useId()
  return (
    <div ref={rootRef}>
      <div>
        <label htmlFor={`${id}-text`}>Text Input</label>
        <input type="text" id={`${id}-text`} />
      </div>
      <div>
        <label htmlFor={`${id}-dropdown`}>Dropdown</label>
        <select id={`${id}-dropdown`}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </div>
      <div>
        <div>
          <input
            type="checkbox"
            name={`${id}-checkbox`}
            id={`${id}-checkbox-1`}
          />
          <label htmlFor={`${id}-checkbox-1`}>Checkbox 1</label>
        </div>
        <div>
          <input
            type="checkbox"
            name={`${id}-checkbox`}
            id={`${id}-checkbox-2`}
          />
          <label htmlFor={`${id}-checkbox-2`}>Checkbox 2</label>
        </div>
        <div>
          <input
            type="checkbox"
            name={`${id}-checkbox`}
            id={`${id}-checkbox-3`}
          />
          <label htmlFor={`${id}-checkbox-3`}>Checkbox 3</label>
        </div>
      </div>
      <div>
        <div>
          <input type="radio" name={`${id}-radio`} id={`${id}-radio-1`} />
          <label htmlFor={`${id}-radio-1`}>Radio 1</label>
        </div>
        <div>
          <input type="radio" name={`${id}-radio`} id={`${id}-radio-2`} />
          <label htmlFor={`${id}-radio-2`}>Radio 2</label>
        </div>
        <div>
          <input type="radio" name={`${id}-radio`} id={`${id}-radio-3`} />
          <label htmlFor={`${id}-radio-3`}>Radio 3</label>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-textarea`}>Textarea</label>
        <textarea id={`${id}-textarea`} />
      </div>
    </div>
  )
}
