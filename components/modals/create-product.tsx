import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const BACKEND_URL = 'http://localhost:3333'

interface props {
  color: String,
  title: String,
  message: String,
  symbol: String,
}

export function CreateProduct({open, setOpen, action, setAction}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState('')
  const router = useRouter()

  const handleCreateProduct = async() => {
    try {
        const send_data = {
            name,
            description,
            category_id: categoryID,
            available_quantity: quantity,
            price,
            img_url: imgURL
        }
        var url =  `${BACKEND_URL}/products/create `            
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
          } else{
            alert('Producto creada correctamente')
            setAction(!action)
          }
    setName('')
    setDescription('')
    setCategoryID('')
    setQuantity('')
    setPrice('')
    setImgURL('')
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
  const getCategories = async() => {
    try {
      var url =  `${BACKEND_URL}/categories`            
      var response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })              
        if (!response.ok){
          response = await response.json()
          alert(response.message)
        } else{
          response = await response.json()          
          setCategories(response.body)
        }
    } catch (error) {
        alert(error)
    }
  }
  getCategories()
}, [])
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
              <DialogPanel className="transform w-full m-auto overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all tablet:w-1/2 tablet:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base mb-4 font-semibold leading-6 text-gray-900">
                        Crear producto
                      </DialogTitle>
                          <div className="mb-5">
                            <label className="flex mb-2 text-sm font-medium self-start">Nombre</label>
                            <input type="text" required onChange={(e) => {setName(e.target.value)}} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>
                          <div className='mb-5'>
                            <select required onClick={(e) => {setCategoryID(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value=''>selecciona una categoría</option>
                              {categories && categories.map((category) => {
                                return(
                                  <option value={category.id}>{category.name}</option>
                                )
                              })
                              }
                            </select>
                          </div>
                          <div className="mb-5">
                            <label className="flex mb-2 text-sm font-medium self-start">Descripción</label>
                            <input type="text" onChange={(e) => {setDescription(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>
                          <div className="mb-5">
                            <label className="flex mb-2 text-smw font-medium">URL de imagen</label>
                            <input type="url" required onChange={(e) => {setImgURL(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>
                          <div className="mb-5">
                            <label className="flex mb-2 text-smw font-medium">Cantidad</label>
                            <input type="number" required onChange={(e) => {setQuantity(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>
                          <div className="mb-5">
                            <label className="flex mb-2 text-smw font-medium">Precio ($)</label>
                            <input type="number" required onChange={(e) => {setPrice(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                          </div>

                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-green-700 hover:bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            onClick={() => {handleCreateProduct()}}
                          >
                            Confirmar
                          </button>
                          <button
                          type="button"
                          className="inline-flex mt-3 w-full justify-center rounded-md bg-orange-500 hover:bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                          onClick={() => setOpen(false)}
                          data-autofocus
                        >
                          Cancelar
                        </button>
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