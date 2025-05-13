// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from '../src/store/store'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CustomerPage from './pages/CustomerPage'
import Navbar from './components/Navbar'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/customer' element={<CustomerPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
