import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useAtom } from 'jotai'
import { CartProducts, CartUpdate } from '@/app/atomsInitial'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const BACKEND_URL = 'http://localhost:3333'

export default function Checkout() {
  const [cart, setCart] = useAtom(CartProducts)
  const [token, setToken] = useState('')
  const [paymentPlatforms, setPaymentPlatforms] = useState([])
  const [paymentPlatform, setPaymentPlatform] = useState(null)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [transferenceId, setTransferenceId] = useState('')
  const [total, setTotal] = useState(0)

  const [requireAddress, setRequireAddress] = useState('')
  const [update, setUpdate] = useAtom(CartUpdate)

  const router = useRouter()

  const totalBill = () => {
    var total_bill = 0;
    for (const product of cart){
      total_bill += product.quantity * product.price
    }
    total_bill = Number.parseFloat(total_bill.toFixed(2))
    setTotal(total_bill)
  }

  const showAccount = () => {
    const platform = paymentPlatforms.find((platform) => platform.id == paymentPlatform)
    if (platform) {
      return platform.account  
    } 
  }

  const handleMakePayment = async () => {
    try {      
      const token_storage = localStorage.getItem('token') 
      if (paymentPlatform == 1 && requireAddress == 'no') {
        alert('Debe haber al menos una transferencia o una dirección')
        return
      }
      if (!paymentPlatform || !requireAddress) {
        alert('Elija las opciones de pago y entrega')
        return
      }
      if (paymentPlatform != 1 && !transferenceId) {
        alert('Coloque el ID de la transferencia')
        return
      }
      if (paymentPlatform == 1) {
        setTransferenceId('')
      }
      if (requireAddress == 'no') {
        setAddress('in store')
      }
      const send_data = {
        payment_platform_id: paymentPlatform,
        products: cart,
        transference_id: transferenceId,
        total: total + 4,
        address: address,
        phone: phone
      }

      
      var url =  `${BACKEND_URL}/payments/make-payment`    
              
      var response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token_storage
          },
          body: JSON.stringify(send_data)
        })              
        if (!response.ok){
          response = await response.json()
          alert(response.message)
        }  else{
          response = await response.json()
          alert(response.message)
          setPaymentPlatform(null)
          setTotal(0)
          setTransferenceId('')
          setAddress('')
          setPhone('')
          setCart([])
          localStorage.setItem('cart', JSON.stringify([]))
          setUpdate(!update)
        }
    } catch (error) {
      alert(error)
    }
  }
  useEffect(()=> {
    const storage_cart = JSON.parse(localStorage.getItem('cart'))
    const token_storage = localStorage.getItem('token')

    if (storage_cart != null) {
      setCart(storage_cart)
    } else {
      setCart([])
    }
    
    if (storage_cart.length == 0) {
      router.push('/')
    }

    if (token_storage) {      
      setToken(token_storage)
    }

    totalBill()
  }, [update, requireAddress])

  useEffect(()=> {
    const getPaymentsPlatforms = async() => {
      try {
        var url =  `${BACKEND_URL}/payments/see-payment-platforms`            
        var response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })              
          if (!response.ok){
            response = await response.json()
            alert(response.message)
          }  else{
            response = await response.json()
            setPaymentPlatforms(response.body)
          }
      } catch (error) {
        alert(error)
      }
    }
    getPaymentsPlatforms()

    const token_storage = localStorage.getItem('token')
    const getUserDirection = async() => {
      try {
        var url =  `${BACKEND_URL}/user`            
        var response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token_storage
            },
          })              

          if (!response.ok){
            response = await response.json()
            alert(response.message)
          }  else{
            response = await response.json()
            
            setAddress(response.body.address)
            setPhone(response.body.phone)
          }
      } catch (error) {
        alert(error)
      }
    }
    if (token_storage) {
      getUserDirection()
    }

  }, [])
  return (
      <div className="space-y-12 px-10 mx-10 pt-10">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Detalles de pago</p>
            <div className="">
              <div className='relative'>
                <select onClick={(e) => {setPaymentPlatform(e.target.value)}} className="bg-gray-50 rounded-md border border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2">
                  <option value=''>Seleccione un tipo de pago</option>
                  {paymentPlatforms && paymentPlatforms.map((platform) => {
                    return(
                      <option value={platform.id}>{platform.name} {platform.account}</option>
                    )
                  })}
                </select>
              </div>
              <p className='pl-4 m-2'>{showAccount()}</p>
              <div className='relative'>
                <select onClick={(e) => {setRequireAddress(e.target.value)}} className="bg-gray-50 rounded-md border border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2">
                  <option value=''>Seleccione delivery o recoger en tienda</option>
                  <option value='si'>Delivery</option>
                  <option value='no'>Recoger en tienda</option>
                </select>
              </div>
              
              {requireAddress != 'no' &&
                <Fragment>
                <label className="mt-4 mb-2 block text-sm font-medium">Dirección completa</label>
                <div className="relative">
                  <input type="text" defaultValue={address} onChange={(e) => {setAddress(e.target.value)}} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="" />
                </div>
                </Fragment>
              }      
              <Fragment>
                <label className="mt-4 mb-2 block text-sm font-medium">Teléfono</label>
                <div className="relative">
                  <input type="text" defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="" />
                </div>
              </Fragment>          
              {paymentPlatform != 1 && 
                  <Fragment>
                  <label className="mt-4 mb-2 block text-sm font-medium">ID de transferencia</label>
                  <div className="relative">
                    <input type="text" onChange={(e) => {setTransferenceId(e.target.value)}} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    </div>
                  </div>
                </Fragment>
              }
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">${total}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Envío</p>
                  <p className="font-semibold text-gray-900">$4.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">${total + 4}</p>
              </div>
            </div>
            <button type="submit" onClick={() => {handleMakePayment()}} className="mt-4 mb-8 w-full rounded-md bg-orange-500 hover:bg-orange-400 px-6 py-3 font-medium text-white">Realizar pedido</button>
          </div>
        </div>
      </div>
  )
}
