import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import CardLoading from '../components/CardLoading'
import Jumbotron from '../components/Jumbotron'
import { getAllProducts, getProductCounts, newProducts } from '../utils/product'
import {Pagination} from "antd"

const NewArrivals = () => {
  
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [productsCount,setProductsCount] = useState(0)


    const freshArrivals = async () => {
        try {
          const response = await newProducts('createdAt','desc',3)
          console.log('new arrivals',response)
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

export default NewArrivals
