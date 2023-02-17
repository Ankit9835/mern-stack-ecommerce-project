import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CategoryForm from '../../../components/CategoryForm'
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, removeCategory } from '../../../utils/category'
import axios from 'axios'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'
import { async } from '@firebase/util'
import SearchFilter from '../../../components/SearchFilter'


const SubCreate = () => {

    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const [category,setCategory] = useState([])
    const [subCategory,setSubCategory] = useState([])
    const [subClass,setSubclass] = useState('')
    const [keyword,setKeyword] = useState('')
    const {user} = useSelector((state) => state.auth)
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
          const res =  await axios.post(`${process.env.REACT_APP_URL}/sub`,{name,subClass},{
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
              toast.success(`${res.data.name} is created`)
              getAllSubCategory()
          }
      } catch (error) {
          console.log('error',error)
          setLoading(false)
          toast.error(error.message)
      }
    }
  
    const getAllCategory = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/categories`)
          console.log(response.data.categories)
          setCategory(response.data.categories)
      } catch (error) {
          console.log(error)
      }
    }

    const getAllSubCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/subs`)
            console.log('sub category',response)
            setSubCategory(response.data)
        } catch (error) {
            console.log(error)
        }
      }
  
    const handleRemove = async (slug) => {
      try {
          setLoading(true)
          const response = await axios.delete(`${process.env.REACT_APP_URL}/sub/${slug}`,{
              headers:{
                  authtoken: user.token
              }
          })
          console.log(response)
          if(response){
              setLoading(false)
              toast.success(`${response.data.name} is deleted`)
              getAllSubCategory()
          }
      } catch (error) {
          console.log(error)
      }
    }
  
    const handleChange = (e) => {
      e.preventDefault()
      setKeyword(e.target.value)
    }
    
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
  
    useEffect(() => {
      getAllCategory()
    },[])

    useEffect(() => {
        getAllSubCategory()
      },[])

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
          <h4>Create sub category</h4>
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
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>


        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/> 
        <hr />
        <SearchFilter keyword={keyword} handleChange={handleChange} setKeyword={setKeyword} />
      <br />
        {subCategory.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        
      </div>
    </div>
  </div>
  )
}

export default SubCreate
