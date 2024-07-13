import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'

const BACKEND_URL = 'http://localhost:3333'

export default function Example() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const  handleSignIn = async () => {
    const data = {
      email,
      password
    }
      var response = await fetch(`${BACKEND_URL}/auth/log-in`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(data)
      })      
      if (response.status == 404) {
        alert('Credenciales erroneas')
      } 
      if (!response.ok) {
        const data = await response.json() 
        
        alert(data.message)
      } else{
        response = await response.json()
        localStorage.setItem('token', response.body)

        const isAdmin = await fetch(`${BACKEND_URL}/user/is-admin`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + response.body,
        }
      }) 
      if (isAdmin.ok){
        router.push('/admin/products')
      } else {
        router.push('/')
      }    

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
          <div className="laptop:mx-auto laptop:w-full laptop:max-w-sm">
            <div className="flex justify-center">
                <img src="/static/images/socials/logo.png" alt="" width="170" />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entra en tu cuenta
            </h2>
          </div>
  
          <div className="mt-10 tablet:mx-auto  tablet:max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete="email"
                    onChange={(e)=> {setEmail(e.target.value)}}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <Link href="/auth/recover-password">
                      <a className="font-semibold text-green-700 hover:text-green-600">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e)=> {setPassword(e.target.value)}}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:w-96 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={() => {handleSignIn()}}
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
              <div className="text-sm">
                <Link href="/auth/sign-up">
                  <a href="/auth/sign-up" className="font-semibold text-green-700 hover:text-green-600">
                    ¿No tienes cuenta? Regístrate aquí
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  