import { useState } from "react"

const BACKEND_URL = 'http://localhost:3333'

export default function RecoverPassword() {
  const [email, setEmail] = useState('')

  const handleSendLink = async() => {
    try {
      const send_data = {
        email
      }
      const response = await fetch(`${BACKEND_URL}/auth/password-recover`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(send_data)
      })

      if (!response.ok) {
        const response_json = await response.json()
        alert(response_json.message)
      } else{
        alert('Hemos enviado un link a su correo electrónico')
      }

    } catch (error) {
      alert(error)
    }
  }    
  
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mx-10 px-10">
          <div className="tablet:mx-auto tablet:w-full tablet:max-w-sm">
          <div className="flex justify-center">
                <img src="/static/images/socials/logo.png" alt="" width="170" />
            </div>            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Coloca el email para enviar el link de recuperación
            </h2>
          </div>
  
          <div className="flex justify-center mt-10 laptop:mx-auto laptop:container laptop:max-w-sm">
            <div className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Ingresa tu correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    autoComplete="email"
                    required
                    className="tablet:w-96 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 tablet:text-sm tablet:leading-6 pl-2"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={() => {handleSendLink()}}
                  className="flex w-full tablet:w-96 justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Recuperar contraseña
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }
  