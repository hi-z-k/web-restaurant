import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { RestaurantProvider } from './context/RestaurantProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RestaurantProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RestaurantProvider>
  </BrowserRouter>
)