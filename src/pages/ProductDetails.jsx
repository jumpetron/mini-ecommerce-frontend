import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!id) {
      console.error('Product ID is missing')
      return
    }

    axios
      .get(`https://mini-ecommerce-backend-blhq.onrender.com/products/${id}`)
      .then((res) => {
        if (res.data) {
          setProduct(res.data)
        } else {
          console.error('Product not found')
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
      })
  }, [id])

  if (!product) return <p>Loading...</p>

  const isInCart = cartItems.some((item) => item.id === product.id)

  return (
    <div className='p-4 max-w-2xl mx-auto'>
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-60 object-contain rounded'
      />
      <h1 className='text-2xl font-bold mt-4'>{product.name}</h1>
      <p className='mt-2'>${product.price}</p>
      <p>Rating: {product.rating}</p>
      {isInCart ? (
        <button
          className='mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed'
          disabled>
          Added
        </button>
      ) : (
        <button
          className='mt-4 px-4 py-2 bg-green-600 text-white rounded cursor-pointer'
          onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default ProductDetails
