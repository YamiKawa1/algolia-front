import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'

const SearchBar = dynamic<any>(() =>
  import(
    '@/components/index/searchBar'
  ).then((mod) => mod.SearchBar)
)

const BACKEND_URL = 'http://localhost:3333'
const sortOptions = [
  { name: 'Precio: Bajo-Alto', order: 'asc', current: false },
  { name: 'Precio: Alto-Bajo', order: 'desc', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export type FilterProps = React.ReactNode

export function Filter({setCategory, setOrder, setCategoryName}: any) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(()=> {
    const getFilters = async () => {
    var response = await fetch(`${BACKEND_URL}/categories`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
  }
    response = await response.json()

    setCategories(response.body)
  };
  getFilters()
  }, []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-header" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Search Category</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    </ul>
                    <div key={1000} className="px-4 py-6 border-b">
                        <h5 className="-mx-2 -my-3 flow-root">
                          <button onClick={() => {
                            setCategory('') 
                            setCategoryName('Todo lo que necesitas')
                            }}>                          
                            <span className="font-medium text-gray-900 ">Todo</span>
                          </button>
                        </h5>
                    </div>
                    {categories && categories.map((section) => (
                      <div key={section!.id} className="px-4 py-6 border-b">
                        <h5 className="-mx-2 -my-3 flow-root">
                          <button onClick={() => {
                            setCategory(section!.id) 
                            setCategoryName(section!.name)
                            }}>                          
                            <span className="font-medium text-gray-900">{section!.name}</span>
                          </button>
                        </h5>
                      </div>
                    ))}
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto px-4">
          <div className="flex items-baseline justify-between">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                    {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <button
                              onClick={() => setOrder(option.order)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Search Category</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className='w-80'>
              {/* TODO: Here goes search bar */}
              <SearchBar />
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

          </section>
        </main>
      </div>
    </div>
  )
}
