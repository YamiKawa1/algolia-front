import { Container } from '@/components/container/container'
import { SearchBar } from '../index/searchBar';
import {TrashIcon, ArrowPathIcon} from '@heroicons/react/20/solid'
const products =[{
  id: 82,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 23,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 42,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 43,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 44,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
},
{
  id: 45,
  name: 'sdsd',
  imgURL: 'https://sellingsys-bucket-45821.s3.us-east-2.amazonaws.com/Diclofenac+Potasico+50mg+30+Tabletas+Medigen.jpeg',
  available_quantity: 21,
  reserved_quantity: 5,
  total: 26,
  price: 475.00
}]

export type ShowProductsProps = React.ReactNode;

export function ShowProducts() {
    return (
        <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
            <section className="py-1 bg-blueGray-50">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h4 className="font-semibold text-base text-blueGray-700">Productos</h4>
                      </div>
                      <div className='w-80'>
                      <SearchBar />
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-7">
                        <button className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2" type="button">Ver todo</button>
                        <button className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2 mr-24" type="button">Crear producto</button>
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
                            Product name
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            IMG URL
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Disponibles
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Reservados
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                          </th>
                          <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Precio
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
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                              {product.name}
                            </td>
                            <td className="border-t-0 px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.imgURL}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.available_quantity}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.reserved_quantity}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.total}
                            </td>
                            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {product.price}
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