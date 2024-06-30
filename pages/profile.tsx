import { useEffect, useState } from 'react'
import { Container } from '@/components/container/container'
import { SearchBar } from '@/components/index/searchBar';
import {TrashIcon, ArrowPathIcon, ShoppingCartIcon} from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';



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

const BACKEND_URL = 'http://localhost:3333'

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [direction, setDirection] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleUpdateUser = async () => {
    var token = localStorage.getItem('token')
    try {
      const send_data = {
        name,
        email,
        direction,
        phone,
        password
      }
      const response = await fetch(`${BACKEND_URL}/user`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },  
        body: JSON.stringify(send_data)
      })
    } catch (error) {
      
    }
  }

  useEffect(()=> {    
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
    const getUser = async () =>{ 
      try {
        const response = await fetch(`${BACKEND_URL}/user`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })
        if (!response.ok) {
          const data = await response.json()
          alert(data.message)
        } else {
          const data = await response.json()
          setName(data.body.name)
          setEmail(data.body.email)
          setDirection(data.body.direction)
          setPhone(data.body.phone)
        }
      } catch (error) {
        alert(error)
      }
    }

    const getPayments = async () => {
      try {

        const payments = await fetch(`${BACKEND_URL}/user/payments`, {
        })
  
        } catch (error) {
        
        }
      }

    getUser()
    getPayments()
  }, [])

  return (
    <div>
      <form>
        <div className="space-y-12 px-10 mx-10">
          <div className="border-b border-gray-900/10 pb-12 mt-10">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Informacion personal</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">Usa una direccion donde puedas recibir tus compras.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 tablet:grid-cols-6">
              <div className="tablet:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="given-name"
                    defaultValue={name}
                    onChange={(e) => {setName(e.target.value)}}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6"
                  />
                </div>
              </div>

              <div className="tablet:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete="email"
                    defaultValue={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    disabled={true}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6"
                  />
                </div>
              </div>

              <div className="tablet:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Telefono
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    defaultValue={phone}
                    onChange={(e) => {setPhone(e.target.value)}}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6"
                  />
                </div>
              </div>

              <div className="tablet:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Direccion
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    defaultValue={direction}
                    onChange={(e) => {setDirection(e.target.value)}}
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 pr-10 mr-10">
          <button
            type="submit"
            onClick={() => {handleUpdateUser()}}
            className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Guardar
          </button>
        </div>
      </form>

      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
          <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blueGray-700">Mis compras</h3>
                    </div>
                    <div className='w-80'>
                    <SearchBar />
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
    </div>
  )
}
