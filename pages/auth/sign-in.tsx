import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

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
    try {
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
        alert('hubo un error inesperado')
      } else{
        response = await response.json()
        console.log('hola',response);
        
        localStorage.setItem('token', response.body)
        router.push('/')

      }  
    } catch (error) {
      alert(error)
    }
    
  }

  useEffect(()=> {
    console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  
  return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-10 px-10">
          <div className="laptop:mx-auto laptop:w-full laptop:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entrar en tu cuenta
            </h2>
          </div>
  
          <div className="mt-10 tablet:mx-auto  tablet:max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
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
                    <a href="/auth/recover-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Olvido su contraseña?
                    </a>
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
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </div>
  
          </div>
        </div>
      </>
    )
  }
  