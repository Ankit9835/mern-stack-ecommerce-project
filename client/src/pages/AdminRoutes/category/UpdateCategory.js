import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryFormUpdate from '../../../components/CategoryFormUpdate'
import AdminNav from '../../../components/nav/AdminNav'



const UpdateCategory = () => {

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState([])
    const {user} = useSelector((state) => state.auth)
    const routeParams = useParams();
    const navigate = useNavigate()
    const getSingleCategory = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_URL}/category/${routeParams.slug}`)
            console.log('response',response.data)
            if(response){
                setLoading(false)
                setName(response.data.categories.name)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getSingleCategory()
    },[])
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
          const res =  await axios.put(`${process.env.REACT_APP_URL}/category/${routeParams.slug}`,{name},{
              headers:{
                 authtoken: user.token
              }
          })
          console.log(res)
          if(res){
              if(res.data.err === 11000){
                  setLoading(false)
                  setName('')
                  return toast.error('Duplicate value, try another anoe')
              }
              setLoading(false)
              setName('')
              toast.success(`category is updated`)
              navigate('/admin/category')
          }
      } catch (error) {
          console.log('error',error)
          setLoading(false)
          toast.error(error.message)
      }
    }

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">
        {loading ? (
          <h4 className="text-danger">Loading..</h4>
        ) : (
          <h4>Update category</h4>
        )}
        <CategoryFormUpdate handleSubmit={handleSubmit} name={name} setName={setName}  />
        <hr />
       
      </div>
    </div>
  </div>
  )
}

export default UpdateCategory
