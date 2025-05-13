import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart } from '../features/cartSlice'

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  )

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex justify-between items-center border-b py-2'>
              <div>
                <h3>{item.name}</h3>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <button
                className='text-red-500 cursor-pointer'
                onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <p className='mt-4 font-bold'>Total: ${total.toFixed(2)}</p>
          <div className='flex justify-between items-center mt-4'>
            <Link
              to='/checkout'
              className='inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded'>
              Go to Checkout
            </Link>
            <button
              onClick={() => navigate(-1)}
              className='mt-4 px-4 py-2 bg-green-600 text-white rounded cursor-pointer'>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
