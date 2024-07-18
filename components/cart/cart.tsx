import { Fragment, useEffect, useState } from 'react'
import { useAtom, useSetAtom, atom } from 'jotai'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartProducts, CartUpdate } from '@/app/atomsInitial'
import Link from 'next/link'
import { atomWithLocalStorage } from '@/app/atomsInitial'

interface Iproduct{
  id: number,
  name: string,
  price: number,
  quantity: number,
  img_url: string
}

export default function Cart({isOpen, setIsOpen}:any) {
  const [cart, setCart] = useAtom(CartProducts)
  const [total, setTotal] = useState(0)
  const [update, setUpdate] = useAtom(CartUpdate)
  

  const totalBill = () => {
    var total_bill = 0;
    for (const product of cart){
      total_bill += product.quantity * product.price
    }  
    total_bill = Number.parseFloat(total_bill.toFixed(2))
    setTotal(total_bill)
  }

  const handleQuantity = (id, quantity) => {
    const new_cart = [...cart]
    new_cart[id].quantity = quantity
    setCart([...new_cart])
    localStorage.setItem('cart', JSON.stringify(new_cart))
    setUpdate(!update)
  }

  const handleRemoveItem = (id) => {    
    var new_cart = [...cart]
    const index = new_cart.findIndex(product => product.id == id)
    new_cart.splice(index, 1)
    setCart([...new_cart])
    localStorage.setItem('cart', JSON.stringify(new_cart))
    setUpdate(!update)
  }

  useEffect(()=> {
    const storage_cart = JSON.parse(localStorage.getItem('cart'))

    if (storage_cart != null) {
      setCart(storage_cart)
    } else {
      setCart([])
    }
    
    totalBill()
  }, [update])
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog className="relative z-header" onClose={setIsOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">Carrito de compra</DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.length > 0 && cart.map((product:Iproduct, i) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.img_url}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <p>
                                        <Link href={`/product/${product.id}`}>
                                          {product.name}
                                        </Link>
                                      </p>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between  text-sm">
                                    <p className="w-1/3 text-gray-500">cantidad</p>
                                    <input 
                                      type="number" 
                                      defaultValue={product.quantity}
                                      onChange={(e) => {handleQuantity(i, e.target.value)}} 
                                      className='w-1/3 w-full text-center mx-5 border rounded-full font-bold' min={1}
                                    />

                                    <div className="flex w-1/3 ">
                                      <button
                                        type="button"
                                        onClick={() => {handleRemoveItem(product.id)}}
                                        className="font-medium text-green-700 hover:text-green-600"
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${total}</p>
                      </div>
                      <div className="mt-6">
                      <Link href={cart.length > 0 ? "/checkout": ""}>
                        <a className='flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-400'>
                          Comprar
                        </a>
                      </Link>

                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
