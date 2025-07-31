import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'
import AppContextProvider from './Context/AppContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
console.log(PUBLISHABLE_KEY)
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
    {/*          removed strict mode because  React Strict Mode (in main.jsx) mounts and unmounts your component twice in development (to catch side effects). so we are calling many instances of webcontainer because in the dependency array of usewebcontainer we are running on mount and only one instance of this can be created  */}
    <AppContextProvider >
      <App />
    </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
)
