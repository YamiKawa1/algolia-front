import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Link from 'next/link'

const BACKEND_URL = 'http://localhost:3333'

export default function Example() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passEqual, setPassEqual] = useState(false)
  const router = useRouter()

  const verifyPasswords = (password2value:string) => {
    if (password2value == password) {
      setPassEqual(false)
    } else {
      setPassEqual(true)
    }
  }

  const  handleSignUp = async () => {
    const data = {
      email,
      password,
      phone,
      name
    }

    try {
      var response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(data)
      })

      if (response.status == 400) {
        response = await response.json()
        alert(response.message)
      }

      if (response.ok) {
        response = await response.json()
        localStorage.setItem('token', response.body)
        router.push('/')
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(()=> {    
    if (localStorage.getItem('token')){
      router.push('/')
    }
  }, [])

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-10 px-10">
          <div className="tablet:mx-auto tablet:w-full tablet:max-w-sm">
          <div className="flex justify-center">
                <img src="/static/images/socials/logo.png" alt="" width="170" />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crea tu cuenta
            </h2>
          </div>
  
          <div className="mt-10 tablet:mx-auto tablet:w-full tablet:max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e)=> {setEmail(e.target.value)}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:w-96 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre y Apellido
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    onChange={(e)=> {setName(e.target.value)}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Teléfono
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    onChange={(e)=> {setPhone(e.target.value)}}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:w-96 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2 ">
                  <input
                    type="password"
                    onChange={(e)=> {setPassword(e.target.value)}}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Confirmar contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    onChange={(e) => {verifyPasswords(e.target.value)}}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
                <p className={passEqual? "text-red-500": "hidden"}>Tu contraseña no coincide</p>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={() => {handleSignUp()}}
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Crear cuenta
                </button>
              </div>
              <div className="text-sm">
                <Link href="/auth/sign-in">
                  <a className="font-semibold text-green-700 hover:text-green-600">
                    ¿Ya tienes cuenta? Entra aquí
                  </a>
                </Link>

              </div>
              
            </div>
  
          </div>
        </div>
      </>
    )
  }
  