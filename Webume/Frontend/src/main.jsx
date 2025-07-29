import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/*          removed strict mode because  React Strict Mode (in main.jsx) mounts and unmounts your component twice in development (to catch side effects). so we are calling many instances of webcontainer because in the dependency array of usewebcontainer we are running on mount and only one instance of this can be created  */}
      <App />
    
  </BrowserRouter>
)
