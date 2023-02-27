import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import { getAllProducts } from '../utils/product'



const Home = () => {
  const [products,setProducts] = useState([])
  const getProducts = async () => {
    try {
      const response = await getAllProducts(10)
      console.log('all products',response.data)
      setProducts(response.data.products)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  },[])
  return (
    <div>
      {/* <pre>
      {JSON.stringify(products,null,4)}

      </pre> */}
      {products.map((product) => {
        return <AllProducts key={product._id} {...product} />
      })}
     
    </div>
  )
}

export default Home
