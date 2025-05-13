import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../features/cartSlice'

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value })

  const validateForm = () => {
    return Object.values(customer).every((value) => value.trim() !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      // 1. Create customer
      const customerRes = await axios.post(
        'https://mini-ecommerce-backend-blhq.onrender.com/customers',
        customer
      )
      const customerId = customerRes.data.id

      // 2. Create order with cart items
      const orderRes = await axios.post(
        'https://mini-ecommerce-backend-blhq.onrender.com/checkout',
        {
          customer_id: customerId,
          items: cartItems
        }
      )

      // 3. Clear cart after successful order placement
      dispatch(clearCart()) // Clear cart in Redux store
      alert('Order placed successfully!')

      // Navigate to customer page
      navigate('/customer')
    } catch (err) {
      setError('Checkout failed, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Checkout</h2>

      {/* Show error message */}
      {error && <div className='text-red-600 mb-4'>{error}</div>}

      {/* Customer information form */}
      <div className='space-y-2'>
        <input
          name='name'
          value={customer.name}
          onChange={handleChange}
          placeholder='Name'
          className='w-full border p-2'
        />
        <input
          name='email'
          value={customer.email}
          onChange={handleChange}
          placeholder='Email'
          className='w-full border p-2'
        />
        <input
          name='street'
          value={customer.street}
          onChange={handleChange}
          placeholder='Street'
          className='w-full border p-2'
        />
        <input
          name='city'
          value={customer.city}
          onChange={handleChange}
          placeholder='City'
          className='w-full border p-2'
        />
        <input
          name='state'
          value={customer.state}
          onChange={handleChange}
          placeholder='State'
          className='w-full border p-2'
        />
        <input
          name='zip'
          value={customer.zip}
          onChange={handleChange}
          placeholder='Zip Code'
          className='w-full border p-2'
        />
      </div>

      {/* Checkout button */}
      <button
        onClick={handleSubmit}
        className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  )
}

export default CheckoutPage
