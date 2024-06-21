import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

// import { Filter } from '@/components/index/filter'

import { Container } from '@/components/container/container'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

import { NavBottom } from '@/components/nav/nav-bottom'

const ShowProducts = dynamic<any>(() =>
  import(
    '@/components/admin/show-products'
  ).then((mod) => mod.ShowProducts)
)

const ShowCategories = dynamic<any>(() =>
  import(
    '@/components/admin/show-categories'
  ).then((mod) => mod.ShowCategories)
)



export default function Catalog(props: SearchPageLayoutProps) {
  return (
    <SearchPageLayout {...props}>
      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <NavBottom />
        <ShowProducts />
        <ShowCategories />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Catalog, context)
