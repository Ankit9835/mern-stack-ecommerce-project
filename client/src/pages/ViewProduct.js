import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts'
import SingleProduct from '../components/SingleProduct'
import { getSingleProduct, relatedProduct, updateProductRating } from '../utils/product'
import { showAverage } from '../utils/raings'



const ViewProduct = () => {

const [singleProduct,setSingleProduct] = useState({})
const [star,setStar] = useState(0)
const [related,setRelated] = useState([])
const routeParams = useParams().slug
const {user} = useSelector((state) => state.auth)
console.log('users redux',user)
const product = async () => {
    try {
        console.log('route params',routeParams)
        const response = await getSingleProduct(routeParams)
        
        console.log('view product response',response)
        setSingleProduct(response.data.data)
        const related = await relatedProduct(response.data.data._id)
        console.log('related',related)
        setRelated(related.data)
    } catch (error) {
        console.log(error.message)
    }
}

const onStarClick = async (newRating,name) => {
  console.log(newRating,name)
  setStar(newRating)
  //console.log('star',star)
  const updateStar = await updateProductRating(name,newRating,user.token)
  console.log(updateStar)
}

useEffect(() => {
    product()
},[routeParams])

useEffect(() => {
  console.log('single',singleProduct)
  console.log('user ids',user.email)
  if(singleProduct.ratings && user){
    let existingProduct = singleProduct.ratings.find(((pro) => pro.postedBy.toString() === user._id))
    console.log('exists',existingProduct)
    existingProduct && setStar(existingProduct.star)
  }
},[singleProduct])



  return (
    <div className="container-fluid">
    <div className="row pt-4">
    
      <SingleProduct key={singleProduct._id} {...singleProduct} singleProduct={singleProduct} onStarClick={onStarClick} starRating={star} setStar={setStar} />
    </div>

    <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
          {/* {related.map((product) => {
            return <AllProducts key={product._id} {...product} product={product} />
          })} */}
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((product) => (
            <div key={product._id} className="col-md-4">
              <AllProducts key={product._id} {...product} product={product} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  )
}

export default ViewProduct
