import { twMerge } from 'tailwind-merge'
import type { IconProps } from './IconProps'

export function LogoIcon(props: IconProps) {
  return (
    <svg
      {...props}
      className={twMerge('h-6 w-6', props.className)}
      viewBox="208.096 199.99 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="16"
        rx="0.872"
        ry="0.872"
        style={{
          fill: 'none',
          strokeWidth: '2px',
          strokeMiterlimit: '1',
          stroke: 'rgb(245, 158, 11)',
        }}
        width="16"
        x="208.096"
        y="199.99"
      />
    </svg>
  )
}
