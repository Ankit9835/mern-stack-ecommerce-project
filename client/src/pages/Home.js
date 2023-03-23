import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import BestSellers from '../components/BestSellers'
import CardLoading from '../components/CardLoading'
import CategoryList from '../components/category/CategoryList'
import Jumbotron from '../components/Jumbotron'
import NewArrivals from '../components/NewArrivals'
import { getAllProducts, newProducts } from '../utils/product'



const Home = () => {
 const [loading,setLoading] = useState(false)
  return (
    <>
      <div className="jumbotron text-center h1 text-danger">
        <Jumbotron text={['New Arrivals','Best Sellers', 'Latest Products']}/>
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      {loading ? <CardLoading count={3} /> : 
       <NewArrivals />
      }

    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      {loading ? <CardLoading count={3} /> : 
       <BestSellers />
      }

    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <br />
      <br />
     
    </>
  )
}

export default Home
