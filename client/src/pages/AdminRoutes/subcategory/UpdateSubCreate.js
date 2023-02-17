import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CategoryFormUpdate from '../../../components/CategoryFormUpdate'
import AdminNav from '../../../components/nav/AdminNav'



const UpdateSubCreate = () => {

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState([])
    const [subClass,setSubclass] = useState('')
    const {user} = useSelector((state) => state.auth)
    const routeParams = useParams();
    const navigate = useNavigate()
    const getSingleSubCategory = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_URL}/sub/${routeParams.slug}`)
            console.log('response',response.data)
            if(response){
                setLoading(false)
                setName(response.data.name)
                setSubclass(response.data.parent)
            }
        } catch (error) {
            
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/categories`)
            console.log('categories',response.data.categories)
            setCategory(response.data.categories)
        } catch (error) {
            console.log(error)
        }
      }

    useEffect(()=>{
        getSingleSubCategory()
        getAllCategory()
    },[])
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
          const res =  await axios.put(`${process.env.REACT_APP_URL}/sub/${routeParams.slug}`,{name,subClass},{
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
              navigate('/admin/sub')
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
          <h4>Update sub category</h4>
        )}

        <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setSubclass(e.target.value)}
            >
              <option>Please select</option>
              
              {category.length > 0 &&
                category.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === subClass}>
                    {c.name}
                  </option>
                ))}
            </select>
        </div>

        <CategoryFormUpdate handleSubmit={handleSubmit} name={name} setName={setName}  />
        <hr />
       
      </div>
    </div>
  </div>
  )
}

export default UpdateSubCreate
