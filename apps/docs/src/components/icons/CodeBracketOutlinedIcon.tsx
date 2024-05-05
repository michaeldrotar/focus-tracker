import { twMerge } from 'tailwind-merge'
import type { IconProps } from './IconProps'

export function CodeBracketOutlinedIcon(props: IconProps) {
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
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
