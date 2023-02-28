import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import CardLoading from '../components/CardLoading'
import Jumbotron from '../components/Jumbotron'
import { getAllProducts, newProducts } from '../utils/product'

const BestSellers = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const freshArrivals = async () => {
        try {
          const response = await newProducts('sold','desc',3)
          console.log('best sellers',response)
          setProducts(response.data.product)
        } catch (error) {
          console.log('new arrivals error',error.message)
        }
      }

      useEffect(() => {
        freshArrivals()
      },[])
  return (
    
    <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <AllProducts key={product._id} {...product} />
            </div>
          ))}
        </div>
        </div>
  )
}

export default BestSellers
