import { memo } from 'react'

import { Link } from '@ui/link/link'

export type FooterProps = Record<string, unknown>

export const Footer = memo(function Footer() {
  return (
    <footer className="mt-10">
      <div className="flex bg-neutral-lightest justify-between px-20 py-48">
        <div key={1} className="flex flex-col gap-2">
            <div className="label-semibold">Contactos</div>
              <ul className="small-regular flex flex-col gap-2">
                <li>
                <p className='font-bold text-sm'>
                  Teléfono: 04128549665
                  </p>
                </li>
                <li>
                  <p className='font-bold text-sm'>
                  Correo: farmaciabarreto@gmail.com
                  </p>
                </li>
              </ul>
          </div>
        </div>
    </footer>
  )
})
