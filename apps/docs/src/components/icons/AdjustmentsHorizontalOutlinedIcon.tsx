import { twMerge } from 'tailwind-merge'
import type { IconProps } from './IconProps'

export function AdjustmentsHorizontalOutlinedIcon(props: IconProps) {
  return (
    <svg
      {...props}
      className={twMerge('h-6 w-6', props.className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
