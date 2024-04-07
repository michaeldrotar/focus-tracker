import { it, expect } from 'vitest'
import { add } from './math'

it('must add two integers correctly', () => {
  const actual = add(10, 25)
  const expected = 35
  expect(actual).toEqual(expected)
})
