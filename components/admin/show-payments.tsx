import { Container } from '@/components/container/container'
import { SearchBar } from '../index/searchBar';
import {TrashIcon, ArrowPathIcon, ShoppingCartIcon} from '@heroicons/react/20/solid'
const products =[{
  id: 854654652,
  status: 'active',
  bill_id: 21654545,
  user_id: 5,
  total: 26,
  address: 475.00,
  created_at: '28/06/2024'
},
{
  id: 23,
  status: 'active',
  bill_id: 21654545,
  user_id: 5,
  total: 26,
  address: 475.00,
  created_at: '28/06/2024'
},
{
  id: 42,
  status: 'active',
  bill_id: 21654545,
  user_id: 5,
  total: 26,
  address: 475.00,
  created_at: '28/06/2024'
},
{
  id: 43,
  status: 'active',
  bill_id: 21654545,
  user_id: 5,
  total: 26,
  address: 475.00,
  created_at: '28/06/2024'
},
{
  id: 44,
  status: 'active',
  bill_id: 21654545,
  user_id: 5,
  total: 26,
  address: 475.00,
  created_at: '28/06/2024'
}]

export type ShowPaymentsProps = React.ReactNode;

export function ShowPayments() {
    return (
        <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
            <section className="py-1 bg-blueGray-50">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">Products</h3>
                      </div>
                      <div className='w-80'>
                      <SearchBar />
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-7">
                        <button className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-sm px-4 py-2" type="button">Activos</button>
                        <button className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-sm px-4 py-2 mr-24" type="button">Inactivos</button>
                      </div>
                    </div>
                  </div>

                  <div className="block w-full overflow-x-auto h-96">
                    <table className="items-center bg-transparent w-full border-collapse justify-items-center">
                      <thead>
                        <tr>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Ver Compra
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Estatus
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID transferencia
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID usuario
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Direccion
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Creado
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product)=> {
                          return(
                            <tr>
                            <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {product.id}
                            </th>
                            <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className=''>
                                    <button className='w-5'>
                                    <ShoppingCartIcon />
                                    </button>
                                </div>
                            </th>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                              {product.status}
                            </td>
                            <td className="border-t-0 px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.bill_id}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.user_id}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.total}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.address}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.created_at}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className=''>
                                <button className='w-5'>
                                <TrashIcon />
                                </button>
                                <button className='w-5'>
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
            </section>
        </Container>
    )
  }