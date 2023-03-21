import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleProduct from '../components/SingleProduct'
import { getSingleProduct } from '../utils/product'

const ViewProduct = () => {

const [singleProduct,setSingleProduct] = useState({})
const [star,setStar] = useState(0)
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

const onStarClick = (newRating,name) => {
  console.log(newRating,name)
  setStar(newRating)
}

useEffect(() => {
    product()
},[])

  return (
    <div className="container-fluid">
    <div className="row pt-4">
      <SingleProduct key={singleProduct._id} {...singleProduct} onStarClick={onStarClick} starRating={star} setStar={setStar} />
    </div>

    <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
  </div>
  )
}

export default ViewProduct
