import LogoutIcon from '@material-design-icons/svg/outlined/logout.svg'
import RegisterIcon from '@material-design-icons/svg/outlined/app_registration.svg'
import PersonIcon from '@material-design-icons/svg/outlined/person.svg'
import PinDropIcon from '@material-design-icons/svg/outlined/pin_drop.svg'
import LoginIcon from '@material-design-icons/svg/outlined/login.svg'
import ShoppingCartIcon from '@material-design-icons/svg/outlined/shopping_cart.svg'

import { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActive } from '@/app/cartSlice';

import { Tablet, Laptop } from '@/lib/media'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'
import Link from 'next/link'
import { useRouter } from 'next/router'


export function NavTop({setIsOpen}:any) {
  const [token, setToken] = useState()
  const router = useRouter()
  console.log('token',token);
  
  const Logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'))
    }
  }, [token, router])
  
  return (
    <div className="flex flex-col px-4 py-2 laptop:mx-20 laptop:px-0 laptop:pb-0 laptop:mb-5">
      <div className="flex justify-between w-full gap-3">
        <div className="flex items-center">
          {/* TODO <Logo /> */}
          <Link href="/">
            <Button title="Home">
              <img src="/static/images/socials/logo.png" alt="" width="80" />
            </Button>
          </Link>
        </div>

        <div className="flex gap-48">
          <div className="hidden items-center gap-8 laptop:flex">
            <a href="https://maps.app.goo.gl/2tWy9tY6sbE5LfRU6" target="_blank" rel="noopener noreferrer">
              <IconLabel
                icon={PinDropIcon}
                label="Find a store"
                labelPosition="right"
                classNameLabel="label-regular"
              />
            </a>
          </div>

          <div className="flex items-center gap-6 laptop:gap-3">
            <Tablet>
            <a href="https://maps.app.goo.gl/2tWy9tY6sbE5LfRU6" target="_blank" rel="noopener noreferrer">
            <Button title="Stores">
              <IconLabel icon={PinDropIcon} label="Stores" />
            </Button>
            </a>
            </Tablet>
            {/* TODO if user connected */}
            {token &&<Link href="/profile">
              <Button title="Perfil">
                <Tablet>
                  <IconLabel icon={PersonIcon} label="Perfil" />
                </Tablet>
                <Laptop>
                  <IconLabel icon={PersonIcon} />
                </Laptop>
              </Button>
            </Link>}
            {!token && <Link href="/auth/sign-up">
              <Button title="Registrar">
                <Tablet>
                  <IconLabel icon={RegisterIcon} label="Registrar" />
                </Tablet>
                <Laptop>
                  <IconLabel icon={RegisterIcon} />
                </Laptop>
              </Button>
            </Link>}
            {!token && <Link href="/auth/sign-in">
              <Button title="Entrar">
                <Tablet>
                  <IconLabel icon={LoginIcon} label="Entrar" />
                </Tablet>
                <Laptop>
                  <IconLabel icon={LoginIcon} />
                </Laptop>
              </Button>
            </Link>}
            {token && <Link href="/">
                <Button title="Salir" onClick={() => {Logout()}}>
                <Tablet>
                  <IconLabel icon={LogoutIcon} label="Salir" />
                </Tablet>
                <Laptop>
                  <IconLabel icon={LogoutIcon} />
                </Laptop>
              </Button>
            </Link>}


            <Button title="Cart" onClick={()=> {setIsOpen(true)}}> 
              <Tablet>
                <IconLabel icon={ShoppingCartIcon} label="Cart" />
              </Tablet>
              <Laptop>
                <IconLabel icon={ShoppingCartIcon} />
              </Laptop>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};
