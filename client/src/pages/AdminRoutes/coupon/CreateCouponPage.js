import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../utils/coupon";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from '../../../components/nav/AdminNav'
import { useState } from 'react';


const CreateCouponPage = () => {
 const {user} = useSelector((state) => state.auth)
 console.log('user',user)
 const [name,setName] = useState('')
 const [discount,setDiscount] = useState('')
 const [expiry,setExpiry] = useState('')
 const [loading,setLoading] = useState(false)
 const [coupon,setCoupon] = useState([])

 const getAllCoupon = async () => {
    try {
        const response = await getCoupons()
        console.log('get coupons', response)
        setCoupon(response.data.data)
    } catch (error) {
        console.log(error)
    }
 }

 useEffect(() => {
    getAllCoupon()
 },[])

 const handleSubmit = async (e) => {
   e.preventDefault()
   setLoading(true)
        const response = await createCoupon(user.token,{name,discount,expiry})
        console.log('responses', response)
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/create-coupon`, {name,discount,expiry},{
                headers:{
                    authToken:user.token
                }
            })
            console.log('response',response)
            if(response.data.success == true){
                setName('')
                setDiscount('')
                setExpiry('')
                setLoading(false)
                toast.success(response.data.message)
            } if(response.data.success == false) {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    
 }

 const handleRemove = async (id) => {
    try {
        const response = await removeCoupon(id)
        getAllCoupon()
        toast.success(response.data.message)
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }
 }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
        <h4>Coupon</h4>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Discount %</label>
                <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Expiry</label>
                <br />
                <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
                />
            </div>

            <button className="btn btn-outline-primary">Save</button>
            </form>
            <br />

          <h4>{coupon.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupon.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage
