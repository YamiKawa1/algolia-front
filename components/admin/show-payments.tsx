import { Container } from '@/components/container/container'
import { SearchBar } from '../index/searchBar';
import {TrashIcon, ArrowPathIcon, ShoppingCartIcon, CheckBadgeIcon, LockClosedIcon, BuildingStorefrontIcon, PaperAirplaneIcon} from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SeeBill from '../modals/see-bill';

const BACKEND_URL = 'http://localhost:3333'

export type ShowPaymentsProps = React.ReactNode;




export function ShowPayments() {
  const [search, setSearch] = useState('')
  const [bill, setBill] = useState([])
  const [token, setToken] = useState('')
  const [billOpen, setBillOpen] = useState(false)
  const [payments, setPayments] = useState([])
  const [status, setStatus] = useState('')
  const router = useRouter()
  const [action, setAction] = useState(false)

  
const handlePaid = async (id) => {  
  try {
    const answer = window.confirm('¿Quieres marcar este pedido como pagado?')
    if (answer) {
      var url =  `${BACKEND_URL}/payments/payment-paid/${id} `            
      var response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })              
        if (!response.ok){
          response = await response.json()
          alert(response.message)
        } else{
          alert('Pedido pagado correctamente')
          setAction(!action)
        }
    }
  } catch (error) {
      alert(error)
  }
}

const handleClosed = async (id) => {
  try {
    const answer = window.confirm('¿Quieres marcar este pedido como pagado?')
    if (answer) {
      var url =  `${BACKEND_URL}/payments/payment-closed/${id} `            
      var response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        })              
      if (!response.ok){
          response = await response.json()
          alert(response.message)
      } else{
          alert('Pedido pagado correctamente')
          setAction(!action)
      }
    }
  } catch (error) {
      alert(error)
  }
}

const statusBottom = (status, id) => {
  if (status == 'reported') {
    return(
      <button onClick={() => {handlePaid(id)}} className='w-5 text-green-700 hover:text-green-600'>
       <CheckBadgeIcon />
      </button>
    )
  }
  if (status == 'paid') {
    return(
        <button onClick={() => {handleClosed(id)}} className='w-5 text-green-700 hover:text-green-600'>
        <LockClosedIcon />
        </button>
    )
  }
  if (status == 'closed') {
    return
  }
}

  const handleBill = (products) =>{
    setBill(products)
    setBillOpen(true)
  }

  const handleEliminatePayment = async(id) => {
    const answer = window.confirm('¿Seguro que quieres borrar el pedido?')
    if(answer) {
      try {
        var url =  `${BACKEND_URL}/payments/delete-payment/${id}`            
        var response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          })              
          if (!response.ok){
            response = await response.json()
            alert(response.message)
          }  else{
            setAction(!action)
            alert('Pedido eliminado correctamente')
          }
      } catch (error) {
        alert(error)
      }
    } 
  }

  useEffect(()=> {    
    const token_storage = localStorage.getItem('token')
    if (!token_storage) {
      router.push('/')
    }
    setToken(token_storage)
    const getPayments = async () =>{ 
      try {
        var url;
        if (search) {
            url = `${BACKEND_URL}/payments/${search}`
            var response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            })
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            response = await response.json();
            setPayments(response.body)
        } else {
            var url;
            if (status) {
              url = `${BACKEND_URL}/payments?status=${status}`
            } else {
              url = `${BACKEND_URL}/payments`
            }
          var response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          })
          if (!response.ok) {
            const data = await response.json()
            alert(data.message)
          } else {
            response = await response.json()            
            setPayments(response.body)
          }
        }

      } catch (error) {
        alert(error)
      }
    }
    getPayments()
  }, [search, status, action])

    return (
        <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
          <SeeBill bill={bill} open={billOpen} setOpen={setBillOpen}/>
            <section className="py-1 bg-blueGray-50">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">Pedidos</h3>
                      </div>
                      <div className='w-80'>
                      <SearchBar setSearch={setSearch}/>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-7">
                        <button onClick={() => {
                          setSearch('')
                          setStatus('reported')}} className="rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2" type="button">Activos</button>
                        <button onClick={() => {
                          setSearch('')
                          setStatus('closed')}} className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2 mr-24" type="button">Inactivos</button>
                      </div>
                    </div>
                  </div>

                  <div className="block w-full overflow-x-auto h-96">
                    <table className="items-center bg-transparent w-full border-collapse justify-items-center">
                      <thead>
                        <tr>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Ver Compra
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Estatus
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID plataforma de pago
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID transferencia
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            ID usuario
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Dirección
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Creado
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments && payments.map((payment)=> {
                          return(
                            <tr>
                            <th className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {payment.id}
                            </th>
                            <th className="border-t-0 px-3 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <div className=''>
                                    <button onClick={()=> {handleBill(payment.products)}} className='w-5 text-green-700 hover:text-green-600'>
                                    <ShoppingCartIcon />
                                    </button>
                                </div>
                            </th>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                              {payment.status}
                            </td>
                            <td className="border-t-0 text-center px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.payment_platform_id}
                            </td>
                            <td className="border-t-0 text-center px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.transference_id}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.user_id}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.total}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.address}
                            </td>
                            <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {payment.created_at}
                            </td>
                            <td className="border-t-0 text-center px-3 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className=''>
                                <button onClick={()=> {handleEliminatePayment(payment.id)}} className='w-5 text-green-700 hover:text-green-600'>
                                <TrashIcon />
                                </button>
                                {statusBottom(payment.status, payment.id)}
                              </div>
                            </td>

                          </tr>
                          )
                        })}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </section>
        </Container>
    )
  }