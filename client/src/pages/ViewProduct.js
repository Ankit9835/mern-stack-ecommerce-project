import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleProduct from '../components/SingleProduct'
import { getSingleProduct } from '../utils/product'

const ViewProduct = () => {

const [singleProduct,setSingleProduct] = useState({})
const routeParams = useParams().slug

const product = async () => {
    try {
        console.log('route params',routeParams)
        const response = await getSingleProduct(routeParams)
        console.log('view product response',response)
        setSingleProduct(response.data.data)
    } catch (error) {
        console.log(error.message)
    }
}

useEffect(() => {
    product()
},[])

  return (
    <div className="container-fluid">
    <div className="row pt-4">
      <SingleProduct key={singleProduct._id} {...singleProduct} />
    </div>

    <div className="row">
      <div>Related products</div>
    </div>
  </div>
  )
}

export default ViewProduct
