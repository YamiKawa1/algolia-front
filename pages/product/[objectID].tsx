import type { GetServerSidePropsContext } from 'next'

import { Container } from '@/components/container/container'
import type { SearchPageLayoutProps } from '@/layouts/search-page-layout'
import {
  getServerSidePropsPage,
  SearchPageLayout,
} from '@/layouts/search-page-layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addItem} from '@/app/cartSlice'
import { useAtom } from 'jotai'
import { ProviderLayout } from '@/layouts/provider-layout'
export type ProductPageProps = SearchPageLayoutProps & {
  objectID: string
}

const BACKEND_URL = 'http://localhost:3333'

export default function Product({ objectID, ...props }: ProductPageProps) {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    // const [cart, setCart] = useAtom([])
    
    // const cart = useSelector((state) => state.cart.items)
    // const dispatch = useDispatch()

    const handleAddToCart = () => {
      // dispatch(addItem({
      //   id: product.id, 
      //   imgURL:product.imgUrl, 
      //   name:product.name, 
      //   quantity: quantity, 
      //   price: product.price
      // }))      
    }

    const handleQuantity = (e:any, max:number) => {
      if (e.target.value > max) {
        e.target.value = max
        setQuantity(max)
        return
      }
      if (e.target.value < 1){
        e.target.value = 1
        setQuantity(1)
        return
      }
      setQuantity(e.target.value)
    }

    useEffect(() => {
        const getProduct = async () => {
        
            var response = await fetch(`${BACKEND_URL}/products/find-product-by-id/${objectID}`)
            response = await response.json()
            
            setProduct(response.body)
        }
        getProduct()
    }, []);

    return (
      <ProviderLayout>
        <SearchPageLayout {...props}>
            <Container>
              <div className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col laptop:flex-row -mx-4">
                        <div className="laptop:flex-1 px-4">
                            <div className="flex justify-center h-[460px] rounded-lg mb-4">
                                <img className="w-92 h-full object-cover" src={product.img_url} alt="Product Image" />
                            </div>
                            <div className="flex -mx-2 mb-4">
                                <div className="w-1/2 px-2">
                                    <button onClick={() => {handleAddToCart()}} className="w-full bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-full font-bold">Add to Cart</button>
                                </div>
                                <div className="w-1/2 px-2">
                                    <input type='number' onChange={(e) => {handleQuantity(e, product.available_quantity)}} defaultValue={1} className="w-full text-center py-2 px-4 border rounded-full font-bold" />
                                </div>
                            </div>
                        </div>
                        <div className="laptop:flex-1 px-4">
                            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                            <div className="mb-2">
                                <div className="mr-4">
                                  <h1>
                                  ${product.price}
                                  </h1>
                                </div>
                            </div>
                            <div className='mb-10'>
                                    <h5 className="font-bold ">Quedan: {product.available_quantity}</h5>
                            </div>
                            <div className='mt-2'> 
                                <span className="font-bold">Descripcion:</span>
                                <p className="mt-2">
                                  {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </Container>
        </SearchPageLayout>
      </ProviderLayout>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getServerSidePropsPage(Product, context, {
    props: { objectID: context.params?.objectID },
  })
