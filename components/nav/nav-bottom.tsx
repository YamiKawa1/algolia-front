import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { Laptop, Tablet } from '@/lib/media'
import { parseUrl } from '@/utils/parseUrl'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { NavAutocomplete } from './nav-autocomplete'
import { NavItem } from './nav-item'

export function NavBottom() {
  return (
    <div className="flex items-center border-b h-12 mx-20 mb-5 justify-stretch">
          <nav>
            <ul className="flex gap-20 small-uppercase">
              <NavItem label="Productos" href={`/admin/products`} />
              <NavItem label="Pagos" href={`/admin/payments`} />
            </ul>
          </nav>
    </div>
  )
}
