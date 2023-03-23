import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategory } from '../../utils/category'


const CategoryList = () => {
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState([])
    
    const allCategory =  async () => {
        const response = await getAllCategory()
        console.log('category',response)
        setCategory(response.data.categories)
    }

    useEffect(()=>{
        allCategory()
    },[])

  return (
    <div className="container">
    <div className="row">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        category.map((item) => {
            return <div
            key={item._id}
            className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
          >
            <Link to={`/category/${item.slug}`}>{item.name}</Link>
          </div>
        })
      )}
    </div>
  </div>
  )
}

export default CategoryList
