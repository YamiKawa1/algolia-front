import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
/// #if DEV
// eslint-disable-next-line import/order
/// #endif

import type { FooterProps } from '@/components/footer/footer'
import type { HeaderProps } from '@/components/header/header'
import type { CartProps } from '@/components/cart/cart'
import { AppLayout } from '@/layouts/app-layout'
import { scrollToTop } from '@/utils/scrollToTop'
import { ProviderLayout } from '@/layouts/provider-layout'
import '@/styles/_index.css'

export const Header = dynamic<HeaderProps>(() =>
  import(/* webpackChunkName: 'common' */ '@/components/header/header').then(
    (mod) => mod.Header
  )
)

export const Footer = dynamic<FooterProps>(() =>
  import(/* webpackChunkName: 'common' */ '@/components/footer/footer').then(
    (mod) => mod.Footer
  )
)

export const Cart = dynamic<CartProps>(() => 
  import(/* webpackChunkName: 'common' */ '@/components/cart/cart')
)

export default function App({ Component, pageProps, router }: AppProps) {
  // const isCatalogPage = useMemo(
  //   () => router?.pathname === '/catalog/[[...slugs]]',
  //   [router?.pathname]
  // )
  const[isOpen, setIsOpen] = useState(false)
  return (
    <ProviderLayout>
      <AppLayout>
          <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
          <Head>
            <title>Farmacia Dr. Barreto</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"
            />
          </Head>
          <Header setIsOpen={setIsOpen}/>
          <AnimatePresence exitBeforeEnter={true} onExitComplete={scrollToTop}>
              <Component {...pageProps} key={router.route} />
          </AnimatePresence>
      </AppLayout>
      </ProviderLayout>

  )
}
