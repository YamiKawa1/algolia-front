import { useAtomValue } from 'jotai/utils'
import { useState } from 'react'
import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Breadcrumb } from '@/components/@instantsearch/widgets/breadcrumb/breadcrumb'
import { QueryRuleBanners } from '@/components/@instantsearch/widgets/query-rule-banners/query-rule-banners'
import { Container } from '@/components/container/container'
import { configAtom } from '@/config/config'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

const Filter = dynamic<any>(() =>
  import(
    '@/components/index/filter'
  ).then((mod) => mod.Filter)
)

const GridProducts = dynamic<any>(() =>
  import(
    '@/components/index/gridProducts'
  ).then((mod) => mod.GridProducts)
)

export default function Index(props: SearchPageLayoutProps) {
  const { breadcrumbAttributes, refinementsLayoutAtom } = useAtomValue(configAtom)
  const [category, setCategory] = useState('')
  const [order, setOrder] = useState('')
  return (
    <SearchPageLayout {...props}>
      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <Breadcrumb attributes={breadcrumbAttributes} />

        <div className="flex flex-col">
          <Filter 
          setCategory={setCategory} 
          setOrder={setOrder}
          />
          
          <div className="flex-grow flex flex-col gap-2 laptop:gap-5">

            <GridProducts 
            category={category} setCategory={setCategory} 
            order={order} setOrder={setOrder}
            />
          </div>
        </div>
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Index, context)
