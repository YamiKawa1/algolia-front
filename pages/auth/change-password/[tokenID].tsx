import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const BACKEND_URL = 'http://localhost:3333'

export default function CahngePassword({tokenID, ...props}) {
    const [token, setToken] = useState('')
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
    
      const handleChangePassword = async() => {
        try {
          const send_data = {
            verify_token: token,
            newPassword: password
          }
          const response = await fetch(`${BACKEND_URL}/auth/change-password`, {
            method: 'PUT',
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
            alert('La contrasenha ha sido cambiada exitosamente')
            router.push('/auth/sign-in')
          }
    
        } catch (error) {
          alert(error)
        }
      }    
    useEffect(()=> {
        const location = window.location.pathname
        const index = location.lastIndexOf('/') + 1
        setToken(location.slice(index))        
    },[])
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mx-10 px-10">
          <div className="tablet:mx-auto tablet:w-full tablet:max-w-sm">
          <div className="flex justify-center">
                <img src="/static/images/socials/logo.png" alt="" width="170" />
            </div>            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Coloca tu nueva contraseña
            </h2>
          </div>
  
          <div className="flex justify-center mt-10 laptop:mx-auto laptop:container laptop:max-w-sm">
            <div className="space-y-6">
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
                  onClick={() => {handleChangePassword()}}
                  className="flex w-full tablet:w-96 justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  
                  Cambiar contraseña
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }
