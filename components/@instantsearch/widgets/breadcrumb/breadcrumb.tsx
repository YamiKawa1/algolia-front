import { useAtomValue } from 'jotai/utils'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { BreadcrumbProvided, SearchState } from 'react-instantsearch-core'
import { connectBreadcrumb } from 'react-instantsearch-dom'

import { ClientOnly } from '@/components/client-only/client-only'
import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'
import { nbHitsAtom } from '@instantsearch/widgets/virtual-stats/virtual-stats'

export type BreadcrumbProps = BreadcrumbProvided

function BreadcrumbComponent({ items, refine, createURL }: BreadcrumbProps) {
  const nbHits = useAtomValue(nbHitsAtom)



  const currentItem = useMemo(() => items[items.length - 1], [items])

  const searchResults = useAtomValue(searchResultsAtom)


  return (
    <ClientOnly>
      <div className="flex flex-col gap-1 capitalize">
        <ul className="flex items-center gap-1 text-neutral-dark">
        </ul>

        <div className="flex items-center">
          <span className="heading-4 mr-1">
          </span>
          <span className="subhead text-neutral-dark"></span>
        </div>
      </div>
    </ClientOnly>
  )
}

export const Breadcrumb = connectBreadcrumb(memo(BreadcrumbComponent, isEqual))
