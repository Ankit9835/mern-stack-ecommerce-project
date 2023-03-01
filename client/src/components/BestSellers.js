import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import CardLoading from '../components/CardLoading'
import Jumbotron from '../components/Jumbotron'
import { getAllProducts, newProducts } from '../utils/product'
import { Pagination } from 'antd';

const BestSellers = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [productsCount,setProductsCount] = useState(0)
    const [page,setPage] = useState(1)
    const freshArrivals = async () => {
        try {
          const response = await newProducts('sold','desc',page)
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
    <>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <AllProducts key={product._id} {...product} />
            </div>
          ))}
        </div>
        </div>

        <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            defaultCurrent={page}
            total={(productsCount / 3) * 10}
            onChange={(values) => setPage(values)}
          />
        </nav>
      </div>
    </>
  )
}

export default BestSellers
