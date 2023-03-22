import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import CardLoading from '../components/CardLoading'
import Jumbotron from '../components/Jumbotron'
import { getAllProducts, getProductCounts, newProducts } from '../utils/product'
import { Pagination } from 'antd';
import axios from 'axios'
import { showAverage } from '../utils/raings'


const NewArrivals = () => {

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [productsCount,setProductsCount] = useState(0)


    const freshArrivals = async () => {
        try {
          const response = await newProducts('createdAt','desc', page)
          console.log('new arrivals',response)
          setProducts(response.data.product)
        } catch (error) {
          console.log('new arrivals error',error.message)
        }
      }

      const countAllProducts = async () => {
        try {
          const response = await getProductCounts()
          console.log('count all products',response)
          setProductsCount(response.data)
        } catch (error) {
          console.log(error.message)
        }
      }
      

      useEffect(() => {
        freshArrivals()
      },[page])
      useEffect(() => {
        countAllProducts()
      },[])
  return (
    <>
         <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              
              <AllProducts key={product._id} {...product} product={product} />
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

export default NewArrivals
