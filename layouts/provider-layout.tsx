import store from '@/app/store'
import { Provider } from 'react-redux'

export function ProviderLayout({ children }:any) {  
    return (
          <Provider store={store}>
                {children}
          </Provider>
   )
  }