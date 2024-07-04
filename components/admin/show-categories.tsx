import { Container } from '@/components/container/container'
import { SearchBar } from '../index/searchBar';
import {TrashIcon, ArrowPathIcon} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CreateCategory } from '../modals/create-category';
import { Confirm } from '../modals/confirm';
const BACKEND_URL = 'http://localhost:3333'


export type ShowCategoriesProps = React.ReactNode;

export function ShowCategories() {
  const [search, setSearch] = useState('')
  const [token, setToken] = useState('')
  const [action, setAction] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryOpen, setCategoryOpen] = useState(false)
  const router = useRouter()

  const handleDeleteCategory = async(id) => {
    const answer = window.confirm('¿Seguro que quieres borrar la categoria?')
    if(answer) {
      try {
        const send_data = {
          id
        }
        var url =  `${BACKEND_URL}/categories`            
        var response = await fetch(url, {
            method: 'DELETE',
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
          }  else{
            setAction(!action)
            alert('Categoria eliminada correctamente')
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
    } else {
      setToken(token_storage)
    }
    const getPayments = async () =>{ 
      try {
        var url;
        if (search) {
            url = `${BACKEND_URL}/categories/${search}`
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

            console.log(response);

            setCategories(response.body)
        } else {
              url = `${BACKEND_URL}/categories`
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
            console.log(response);
            
            setCategories(response.body)
          }
        }

      } catch (error) {
        alert(error)
      }
    }
    getPayments()
  }, [search, action])
    return (
        <Container className="flex flex-col gap-3 laptop:mt-10 laptop:gap-8">
          <CreateCategory open={categoryOpen} setOpen={setCategoryOpen} action={action} setAction={setAction}/>
            <section className="py-1 bg-blueGray-50">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h4 className="font-semibold text-base text-blueGray-700">Categorias</h4>
                      </div>
                      <div className='w-80 mr-3'>
                      <SearchBar setSearch={setSearch}/>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-7">
                        <button onClick={() => {setSearch('')}} className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2" type="button">Ver todo</button>
                        <button onClick={() => {setCategoryOpen(true)}} className=" rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2 mr-24" type="button">Crear categoria</button>
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
                            Category name
                          </th>
                          <th className="px-3 text-center bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories && categories.map((category)=> {
                          return(
                            <tr>
                              <th className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                {category.id}
                              </th>
                              <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {category.name}
                              </td>
                              <td className="border-t-0 text-center px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className=''>
                                  <button onClick={() => {handleDeleteCategory(category.id)}} className='w-5 text-green-700 hover:text-green-600'>
                                  <TrashIcon />
                                  </button>
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