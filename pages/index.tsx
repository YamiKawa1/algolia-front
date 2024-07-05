import { useState } from 'react'
import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { Banner } from '@/components/banner/banner'
import { Footer } from '@/components/footer/footer'
import { Container } from '@/components/container/container'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import logo from '@/public/static/images/banners/Banner.jpg'
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
  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState('')
  const [order, setOrder] = useState('')
  const [search, setSearch] = useState('')

  return (
    <SearchPageLayout {...props}>
        <Banner 
        size='xl'
        fullWidth={true}
        gradient = {true}
        title={categoryName ? categoryName : 'Todo lo que necesitas'}
        image={logo}
        />

      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <div className="flex flex-col">
          <Filter 
          setCategory={setCategory} 
          setOrder={setOrder}
          setCategoryName={setCategoryName}
          setSearch={setSearch}
          />
          
          <div className="flex-grow flex flex-col gap-2 laptop:gap-5">

            <GridProducts 
            category={category} setCategory={setCategory} 
            order={order} setOrder={setOrder}
            search={search} setSearch={setSearch}
            />
          </div>
        </div>
      </Container>
      <Footer />
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Index, context)
