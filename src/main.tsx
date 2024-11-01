import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain="dev-nfy7do24ocfbkmso.us.auth0.com"
    clientId="yRrTiuuXtaPwQ5iqluHLoccmmtjVlGIB"
    authorizationParams={{
      redirect_uri: window.location.origin + '/callback'
    }}
  >
    <App />
  </Auth0Provider>,
)
