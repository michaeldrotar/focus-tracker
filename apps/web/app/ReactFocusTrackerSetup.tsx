import { TestComponents } from './TestComponents'
import { FocusTracker } from './FocusTracker'

export default function ReactFocusTrackerSetup() {
  return (
    <>
      <h2>ReactFocusTracker</h2>
      <FocusTracker refProperty="rootRef">
        <TestComponents />
      </FocusTracker>
    </>
  )
}
