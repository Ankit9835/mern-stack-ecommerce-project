import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const SubCategoryList = () => {
    const [loading,setLoading] = useState(false)
    const [sub,setSub] = useState([])
    
    const allSubCategory =  async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/subs`)
          console.log('subcategory',response)
          setSub(response.data.sub)   
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        allSubCategory()
    },[])
  return (
    <div className="container">
    <div className="row">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        sub.map((item) => {
            return <div
            key={item._id}
            className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
          >
            <Link to={`/sub-category/${item.slug}`}>{item.name}</Link>
          </div>
        })
      )}
    </div>
  </div>
  )
}

export default SubCategoryList
