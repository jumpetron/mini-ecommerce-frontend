import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'

const HomePage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    price_min: '',
    price_max: '',
    rating: ''
  })
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get('https://mini-ecommerce-backend-blhq.onrender.com/categories')
      .then((res) => setCategories(res.data))
  }, [])

  useEffect(() => {
    axios
      .get('https://mini-ecommerce-backend-blhq.onrender.com/products', {
        params: filters
      })
      .then((res) => setProducts(res.data))
  }, [filters])

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value })

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Products</h1>

      {/* Filters */}
      <div className='flex justify-center items-center gap-4 mb-4 flex-wrap'>
        <input
          type='text'
          name='search'
          placeholder='Search...'
          onChange={handleChange}
          className='border px-2 py-1'
        />
        <select
          name='category'
          onChange={handleChange}
          className='border px-2 py-1'>
          <option value=''>All Categories</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type='number'
          name='price_min'
          placeholder='Min Price'
          onChange={handleChange}
          className='border px-2 py-1'
        />
        <input
          type='number'
          name='price_max'
          placeholder='Max Price'
          onChange={handleChange}
          className='border px-2 py-1'
        />
        <input
          type='number'
          name='rating'
          placeholder='Min Rating'
          onChange={handleChange}
          className='border px-2 py-1'
        />
        <Link to={'/cart'} className='flex items-center gap-2'>
          <CiShoppingCart size={32} />
          <p className='text-[12px]'>{cartItems.length}</p>
        </Link>
      </div>

      {/* Product List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6'>
        {products.map((product) => (
          <div key={product.id} className='border rounded-xl p-4 shadow-sm'>
            <img
              src={product.image}
              alt={product.name}
              className='h-40 object-contain mb-2 w-full rounded'
            />
            <Link to={`/products/${product.id}`}>
              <h2 className='font-semibold'>{product.name}</h2>
            </Link>
            <p>
              ${product.price} | ⭐ {product.rating}
            </p>
            {cartItems.some((item) => item.id === product.id) ? (
              <button
                className='bg-gray-400 text-white px-3 py-1 mt-2 rounded cursor-not-allowed'
                disabled>
                Added
              </button>
            ) : (
              <button
                className='mt-4 px-4 py-2 bg-green-600 text-white rounded cursor-pointer'
                onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
