import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllProducts from '../../components/AllProducts'
import { getSingleCategory } from '../../utils/category'

const CategoryBasedOnId = () => {
    const {slug} = useParams()
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState({})
    const [product,setProduct] = useState([])

    console.log(slug)
    const newCategory = async () => {
       try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/category/${slug}`)
        console.log('test response',response)
        setCategory(response.data.categories)
        setProduct(response.data.product)
        setLoading(false)
       } catch (error) {
        console.log(error.response)
        setLoading(false)
       }
    }
    useEffect(() => {
        newCategory()
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
              {product.length} Products in "{category.name}" category
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

export default CategoryBasedOnId
