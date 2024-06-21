import { NavBottom } from './nav-bottom'
import { NavTop } from './nav-top'

export function Nav({setIsOpen}:any) {
  return (
    <nav>
      <NavTop setIsOpen={setIsOpen} />
    </nav>
  )
}
