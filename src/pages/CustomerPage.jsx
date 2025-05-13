import { useEffect, useState } from 'react'
import axios from 'axios'

const CustomerPage = () => {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      setError('You are not logged in. Please log in first.')
      return
    }

    axios
      .get('http://localhost:3000/customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Customers</h2>
      {customers.map((c) => (
        <div key={c.id} className='border-b py-2'>
          <p>
            {c.name} - {c.email}
          </p>
          <p>
            {c.street}, {c.city}, {c.state} {c.zip}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CustomerPage
