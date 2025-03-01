import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* <BrowserRouter basename={import.meta.env.BASE_URL}> */}
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>,
)

serviceWorkerRegistration.register()
