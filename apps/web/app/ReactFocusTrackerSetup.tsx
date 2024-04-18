import { TestComponents } from './TestComponents'
import { FocusTrackerRegistration } from '@michaeldrotar/react-focus-tracker/FocusTrackerRegistration'

export default function ReactFocusTrackerSetup() {
  return (
    <>
      <h2>ReactFocusTracker</h2>
      <FocusTrackerRegistration refProperty="rootRef">
        <TestComponents />
      </FocusTrackerRegistration>
    </>
  )
}
