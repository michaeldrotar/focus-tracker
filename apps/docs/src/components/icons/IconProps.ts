import type { ComponentProps } from 'react'

export type IconProps = Pick<
  ComponentProps<'svg'>,
  'className' | 'height' | 'width'
>
