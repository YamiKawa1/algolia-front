import { memo } from 'react'

import { Link } from '@ui/link/link'

export type FooterProps = Record<string, unknown>

export const Footer = memo(function Footer() {
  return (
    <footer className="mt-auto">
      <div className="hidden bg-neutral-lightest justify-between px-20 py-24 laptop:flex">
        <div key={1} className="flex flex-col gap-2">
            <div className="label-semibold">Contactos</div>
              <ul className="small-regular flex flex-col gap-2">
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Numero de telefono:`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                                        Numero de telefono:
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Link ${1 + 1}`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    Correo:
                  </Link>
                </li>
              </ul>
          </div>
          <div key={1} className="flex flex-col gap-2">
            <div className="label-semibold">Contactos</div>
              <ul className="small-regular flex flex-col gap-2">
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Numero de telefono:`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                                        Numero de telefono:
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Link ${1 + 1}`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    Correo:
                  </Link>
                </li>
              </ul>
          </div>
          <div key={1} className="flex flex-col gap-2">
            <div className="label-semibold">Contactos</div>
              <ul className="small-regular flex flex-col gap-2">
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Numero de telefono:`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                                        Numero de telefono:
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/footer-link-${1 + 1}-${2 + 1}`}
                    title={`Link ${1 + 1}`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    Correo:
                  </Link>
                </li>
              </ul>
          </div>
        </div>
    </footer>
  )
})
