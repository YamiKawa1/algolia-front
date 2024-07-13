import type { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Container } from '@/components/container/container'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'

import { NavBottom } from '@/components/nav/nav-bottom'
import { useEffect, useState } from 'react'
const BACKEND_URL = 'http://localhost:3333'

const ShowPayments = dynamic<any>(() =>
  import(
    '@/components/admin/show-payments'
  ).then((mod) => mod.ShowPayments)
)


export default function Payments(props: SearchPageLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    const token_storage = localStorage.getItem('token')
    if (!token_storage){
      router.push('/')
    } 
    const verifyToken = async() => {
      const response = await fetch(`${BACKEND_URL}/user/is-admin`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token_storage,
        }
      })                  
      
      if (!response.ok) {
        const data = await response.json()
        if (data.message == 'token expired') {
          localStorage.removeItem('token')
          location.reload();
        } 
        router.push('/')
      }
    }
    verifyToken()

  }, [])
  return (
    <SearchPageLayout {...props}>
      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <NavBottom />
        <ShowPayments />
      </Container>
    </SearchPageLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Payments, context)
