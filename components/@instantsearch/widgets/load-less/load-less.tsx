import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'

import { Button } from '@/components/@ui/button/button'
import type { ProductCardHitProps } from '@/components/product-card/product-card-hit'
import { isSearchStalledAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

export type LoadLessProps = Pick<
  InfiniteHitsProvided<ProductCardHitProps>,
  'hasPrevious' | 'refinePrevious'
>

export function LoadLess({ hasPrevious, refinePrevious }: LoadLessProps) {
  const isSearchStalled = useAtomValue(isSearchStalledAtom)


  if (!hasPrevious) return null

  return (
    <div className="flex flex-col justify-center gap-2 mb-2 laptop:gap-4 laptop:flex-row laptop:mb-7">
      <Button
        type="secondary"
        disabled={isSearchStalled}
      >
        Go to first page
      </Button>

      <Button
        type="primary"
        disabled={isSearchStalled}
        onClick={refinePrevious}
      >
        {isSearchStalled ? 'Loading' : 'Load previous'}
      </Button>
    </div>
  )
}
