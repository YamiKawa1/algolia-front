import { useState } from 'react'

export type SearchBarProps = React.ReactNode

export function SearchBar({setSearch}:any) {
  const[ searchValue, setSearchValue] = useState('')

  const handleSearch = (value) => {
    setSearch(value)
    setSearchValue('')
  }

  return (
    <div className="mx-auto">   
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"  fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" onChange={(e) => {setSearchValue(e.target.value)}} value={searchValue} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar..." required />
          <button type='submit' onClick={() => {handleSearch(searchValue)}} className="rounded-md border border-transparent text-base font-medium text-white shadow-sm absolute end-1 bottom-2 bg-orange-500 hover:bg-orange-400 text-sm px-4 py-2">Buscar</button>
      </div>
  </div>
  )
}
