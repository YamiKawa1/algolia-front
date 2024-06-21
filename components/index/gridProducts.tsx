import { memo, useState, useEffect } from 'react'
import { ProductCard } from './productCard'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
const listItemTransition = {
    ease: [0.16, 1, 0.3, 1],
    duration: 0.6,
  }

const listItemVariants = {
hidden: { opacity: 0 },
show: (i: number) => ({
    opacity: 1,
    transition: {
    delay: i * 0.06,
    duration: 1,
    ease: [0.16, 1, 0.3, 1],
    },
}),
}

const PRODUCTS_PER_PAGE = 20
const BACKEND_URL = 'http://localhost:3333'


export const GridProducts = memo(function GridProducts({
    animation = true,
    order,
    category,
}) {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(0)
    const [error, setError] = useState(null)
    const [productsPerPage, setProductsPerPage] = useState(0)
    const shouldReduceMotion = useReducedMotion()
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                var url;
                if(order && category) {
                    url =`${BACKEND_URL}/products/order-products/${page}/${PRODUCTS_PER_PAGE}?priceSort=${order}&category=${category}`
                } else {
                    if(order){
                        url =`${BACKEND_URL}/products/order-products/${page}/${PRODUCTS_PER_PAGE}?priceSort=${order}`
                    }
                    if(category) {
                        url =`${BACKEND_URL}/products/order-products/${page}/${PRODUCTS_PER_PAGE}?category=${category}`
                    }
                }
                if(!order && !category) {
                    url =`${BACKEND_URL}/products/order-products/${page}/${PRODUCTS_PER_PAGE}`
                }
                var response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                response = await response.json();

                setPageNumber(response.body!.meta.lastPage)             
                setProducts(response.body!.data);
            } catch (e) {
                setError(e.message);
            }
          };    
        fetchData()  

        if (!productsPerPage) setProductsPerPage(products.length)
            
      }, [page, order, category])
    
    const handlePage = (page: number) => {
        setPage(page)
        return true
    }

    return (
        <section className="w-full ">
            <m.ol
            className='flex flex-wrap justify-center tablet:justify-evenly'
            initial="hidden"
            animate="show"
            exit="hidden"
            >
            <AnimatePresence>
                {products.map((product, i) => (
                                <m.li
                                key={product.id}
                                layout={shouldReduceMotion || !animation ? false : 'position'}
                                transition={listItemTransition}
                                variants={listItemVariants}
                                custom={i % PRODUCTS_PER_PAGE}
                            >
                                <ProductCard product={product}/>
                            </m.li>
                ))}
            </AnimatePresence>
            </m.ol>
            <nav className='flex justify-center'>
                <ul className="flex items-center -space-x-px h-10 text-base">
                    {Array(pageNumber).fill(1).map((el, i) =>
                        <li key={i}> 
                            <button onClick={() => setPage(i+1)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                {i+1}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </section>
    )
})

