import { useEffect, useState } from 'react'
import { Container } from '@/components/container/container'
import { SearchBar } from '@/components/index/searchBar';
import {TrashIcon, ArrowPathIcon, ShoppingCartIcon} from '@heroicons/react/20/solid'
import SeeBill from '@/components/modals/see-bill';
import { useRouter } from 'next/router';

const BACKEND_URL = 'http://localhost:3333'

export default function Profile() {
  const [search, setSearch] = useState('')
  const [payments, setPayments] = useState([])
  const [bill, setBill] = useState([])
  const [billOpen, setBillOpen] = useState(false)

  const router = useRouter()

  const handleBill = (products) =>{
    setBill(products)
    setBillOpen(true)
  }

  useEffect(()=> {    
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
    const getPayments = async () =>{ 
      try {
        var url;
        if (search) {
            url = `${BACKEND_URL}/user/payments/${search}`
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
          var response = await fetch(`${BACKEND_URL}/user/payments`, {
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
  }, [search])

  return (
    <div>
      <Container className="flex flex-col gap-2 laptop:mt-10 laptop:gap-10">
        <SeeBill bill={bill} open={billOpen} setOpen={setBillOpen}/>
          <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blueGray-700">Mis compras</h3>
                    </div>
                    <div className='w-80'>
                    <SearchBar setSearch={ setSearch } />
                    </div>
                  </div>
                </div>

                <div className="block w-full overflow-x-auto h-96">
                  <table className="items-center bg-transparent w-full border-collapse justify-items-center">
                    <thead>
                      <tr>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          ID
                        </th>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Ver Compra
                        </th>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Estatus
                        </th>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          ID transferencia
                        </th>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Total
                        </th>
                        <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Dirección
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments && payments.map((payment)=> {
                        return(
                          <tr>
                          <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {payment.id}
                          </th>
                          <th className="border-t-0 px-3 border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              <div className=''>
                                  <button onClick={()=> {handleBill(payment.products)}} className='w-5 text-green-700 hover:text-green-600'>
                                  <ShoppingCartIcon />
                                  </button>
                              </div>
                          </th>
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {payment.status}
                          </td>
                          <td className="border-t-0 px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {payment.transference_id}
                          </td>
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {payment.total}
                          </td>
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {payment.address}
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
    </div>
  )
}
