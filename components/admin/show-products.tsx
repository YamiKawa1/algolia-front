import { Container } from '@/components/container/container'
import { SearchBar } from '../index/searchBar';
import {TrashIcon, ArrowPathIcon} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CreateProduct } from '../modals/create-product';
import { UpdateProduct } from '../modals/update-product';
const BACKEND_URL = 'http://localhost:3333'
const PRODUCTS_PER_PAGE = 20


export type ShowProductsProps = React.ReactNode;

export function ShowProducts() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [token, setToken] = useState('')
  const [createProductOpen, setCreateProductOpen] = useState(false)
  const [updateProductOpen, setUpdateProductOpen] = useState(false)
  const [updateProduct, setUpdateProduct] = useState({})
  const [action, setAction] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

  const router = useRouter()
  const handleUpdateProduct = (product) =>{
    setUpdateProduct(product)
    setUpdateProductOpen(true)
  }

  const handleEliminateProduct = async(id) =>{
    const answer = window.confirm('¿Seguro que quieres borrar el producto?')
    if(answer) {
      try {
        var url =  `${BACKEND_URL}/products/delete/${id}`            
        var response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          })              
          if (!response.ok){
            response = await response.json()
            alert(response.message)
          }  else{
            setAction(!action)
            alert('Producto eliminado correctamente')
          }
      } catch (error) {
        alert(error)
      }
    } 
  }

  useEffect(()=> {    
    const token_storage = localStorage.getItem('token')
    if (!token_storage) {
      router.push('/')
    }
    setToken(token_storage)
    const getParoducts = async () =>{ 
      try {
        var url;
        if (search) {
            url = `${BACKEND_URL}/products/find-product-by-name/${search}`
            var response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            })
        
            if (!response.ok) {
              if (response.status == 404) {
                  alert('No fue encontrado ningun producto')
              } else {
                alert('Hubo un error inesperado');
              }
            }
            response = await response.json();
            setPageNumber(1)   
            setProducts(response.body)
        } else {
          url = `${BACKEND_URL}/products/list-produtcs/${page}/${PRODUCTS_PER_PAGE}`
          var response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          if (!response.ok) {
            const data = await response.json()
            alert(data.message)
          } else {
            response = await response.json()
            setPageNumber(response.body!.meta.lastPage)       
            setProducts(response.body!.data)
          }
        }

      } catch (error) {
        alert(error)
      }
    }
    getParoducts()
  }, [search, page, action])

    return (
        <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
          <CreateProduct open={createProductOpen} setOpen={setCreateProductOpen} action={action} setAction={setAction}/>
            <UpdateProduct product={updateProduct} open={updateProductOpen} setOpen={setUpdateProductOpen} action={action} setAction={setAction}/>
            <section className="py-1 bg-blueGray-50">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h4 className="font-semibold text-base text-blueGray-700">Productos</h4>
                      </div>
                      <div className='w-80'>
                      <SearchBar setSearch={setSearch}/>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-7">
                        <button className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2" type="button">Ver todo</button>
                        <button onClick={()=> {setCreateProductOpen(true)}} className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2 mr-24" type="button">Crear producto</button>
                      </div>
                    </div>
                  </div>

                  <div className="block w-full overflow-x-auto h-96">
                    <table className="items-center bg-transparent w-full border-collapse justify-items-center">
                      <thead>
                        <tr>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID categoría
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Nombre
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Descripción
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            IMG URL
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Disponibles
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Reservados
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Precio
                          </th>
                          <th className="px-3 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products && products.map((product)=> {
                          return(
                            <tr className='border-b'>
                            <th className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {product.id}
                            </th>
                            <th className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {product.category_id}
                            </th>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                              {product.name}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                              {product.description}
                            </td>
                            <td className="border-t-0 px-3 align-center border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                              {product.img_url}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.available_quantity}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.reserved_quantity}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.total_quantity}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.price}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className=''>
                                <button onClick={() => {handleEliminateProduct(product.id)}} className='w-5 text-green-700 hover:text-green-600'>
                                <TrashIcon />
                                </button>
                                <button onClick={() => {handleUpdateProduct(product)}} className='w-5 text-green-700 hover:text-green-600'>
                                <ArrowPathIcon />
                                </button>
                              </div>
                            </td>

                          </tr>
                          )
                        })}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
              <nav className='flex justify-center mb-10'>
                <ul className="flex items-center -space-x-px h-10 text-base">
                    {pageNumber && Array(pageNumber).fill(1).map((el, i) =>
                        <li key={i}> 
                            <button onClick={() => setPage(i+1)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                {i+1}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            </section>
        </Container>
    )
  }