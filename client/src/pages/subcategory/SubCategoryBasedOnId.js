import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllProducts from '../../components/AllProducts'
import { getSub } from '../../utils/sub'


const SubCategoryBasedOnId = () => {
const {slug} = useParams()
console.log(slug)
const [loading,setLoading] = useState(false)
const [subcategory,setSubCategory] = useState({})
const [product,setProduct] = useState([])

const getSingleSub = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/sub/${slug}`)
        console.log('single sub',response)
        setSubCategory(response.data.sub)
        setProduct(response.data.product) 
    } catch (error) {
        console.log(error.message)
    }
}

useEffect(() => {
    getSingleSub()
},[])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {product.length} Products in "{subcategory.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {product.map((p) => (
          <div className="col" key={p._id}>
            <AllProducts key={p._id} {...p} product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubCategoryBasedOnId
