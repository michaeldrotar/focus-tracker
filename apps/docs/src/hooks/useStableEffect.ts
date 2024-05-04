import type { DependencyList, EffectCallback } from 'react'
import { useEffect } from 'react'
import stableHash from 'stable-hash'

export function useStableEffect(effect: EffectCallback, deps?: DependencyList) {
  const hash = stableHash(deps)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- hash encompasses the proper deps
  useEffect(effect, [hash])
}
