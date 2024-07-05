import { memo } from 'react'

interface ProductType {
    id: number,
    img_url: string,
    name: string,
    price: number
}

export const ProductCard = memo(function ProductCard(props) {  
    const product = props.product
    return (
        <div className="w-72 mb-10 bg-white shadow-md duration-500 hover:scale-100 hover:shadow-xl">
            <a href={`product/${product.id}`}> 
                <img src={product.img_url}
                        alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
                    </div>
                </div>
            </a>
        </div>
    )
  })
  