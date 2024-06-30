import { Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import {removeItem, updateQuantity} from '@/app/cartSlice'

interface Iproduct{
  id: number,
  name: string,
  price: number,
  quantity: number,
  imgURL: string
}

export default function Cart({isOpen, setIsOpen}:any) {
  const cart = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  console.log('cart', cart);
  const handleQuantity = (id, quantity) => {
    dispatch(updateQuantity({id: id, quantity:quantity}))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem({id: id}))

  }

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
                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.length > 0 && cart.map((product:Iproduct) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imgUrl}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <p>
                                        <a href={`/product/${product.id}`}>{product.name}</a>
                                      </p>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between  text-sm">
                                    <p className="w-1/3 text-gray-500">cantidad</p>
                                    <input 
                                      type="number" 
                                      defaultValue={product.quantity}
                                      onChange={(e) => {handleQuantity(product.id, e.target.value)}} 
                                      className='w-1/3 w-full text-center mx-5 border rounded-full font-bold' min={1}
                                    />

                                    <div className="flex w-1/3 ">
                                      <button
                                        type="button"
                                        onClick={() => {handleRemoveItem(product.id)}}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
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
                        <p>$262.00</p>
                      </div>
                      <div className="mt-6">
                        <a
                          href="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-400"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
