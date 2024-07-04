import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
const BACKEND_URL = 'http://localhost:3333'


interface props {
  color: String,
  title: String,
  message: String,
  symbol: String,
}

export function CreateCategory({open, setOpen}) {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const router = useRouter()

    const handleCreateCategory = async() => {
        try {
            const send_data = {
                name
            }
            var url =  `${BACKEND_URL}/categories`            
            var response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(send_data)
              })              
              if (!response.ok){
                response = await response.json()
                alert(response.message)
              }
        } catch (error) {
            alert(error)
        }
        setOpen(false)
    }

    useEffect(() => {
        const token_storage = localStorage.getItem('token')

        if (!token_storage) {
            router.push('/')
        } else {
            setToken(token_storage)
        }
    })
  return (
    <Transition show={open}>
      <Dialog className="z-header" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="transform w-1/3 m-auto overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base mb-4 font-semibold leading-6 text-gray-900">
                        Crear Categoria
                      </DialogTitle>
                        <form className="">
                          <div className="mb-5">
                            <label className="flex mb-2 text-sm font-medium self-start">Nombre</label>
                            <input type="text" onChange={(e) => {setName(e.target.value)}} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-orange-500 hover:bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            onClick={() => handleCreateCategory()}
                          >
                            Confirm
                          </button>
                          <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          data-autofocus
                        >
                          Cancel
                        </button>
                      </form>                      
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>  )
}