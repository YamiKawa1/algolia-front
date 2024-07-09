import { useEffect, useState } from 'react'
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
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleUpdateUser = async () => {
    var token = localStorage.getItem('token')
    try {
      const send_data = {
        name,
        email,
        address,
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
          setAddress(data.body.address)
          setPhone(data.body.phone)
        }
      } catch (error) {
        alert(error)
      }
    }
    getUser()
  }, [])

  return (
    <div>
      <form>
        <div className="space-y-12 px-10 mx-10">
          <div className="border-b border-gray-900/10 pb-12 mt-10">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Información personal</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">Usa una dirección donde puedas recibir tus compras.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 tablet:grid-cols-6">
              <div className="tablet:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre y Apellido
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
                  Correo electrónico
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
                  Teléfono
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
                  Dirección
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    defaultValue={address}
                    onChange={(e) => {setAddress(e.target.value)}}
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
    </div>
  )
}
