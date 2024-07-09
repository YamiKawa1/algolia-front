import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { Context as ResponsiveContext } from 'react-responsive'

import { useIsMounted } from '@/hooks/useIsMounted'
import { useSearchClient } from '@/hooks/useSearchClient'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)

export function AppLayout({ children }: AppLayoutProps) {
  const isMounted = useIsMounted(true)

  // Initialize search client
  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)

  return (
          <LazyMotion features={loadFramerMotionFeatures} strict={true}>
            {isMounted() ? (
              children
            ) : (
              <ResponsiveContext.Provider value={{ width: 1440, height: 980 }}>
                {children}
              </ResponsiveContext.Provider>
            )}
          </LazyMotion>
  )
}
