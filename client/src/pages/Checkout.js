import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { applyCoupon } from '../utils/coupon';
import { addCoupon } from '../redux/couponSlice'



const Checkout = () => {
const [products,setProducts] = useState([])
const [totals,setTotals] = useState('')
const [address,setAddress] = useState('')
const [addressSaved, setAddressSaved] = useState(false);
const [coupon,setCoupon] = useState('')
const [discount,setDiscount] = useState(0)
const {user} = useSelector((state) => state.auth)
const dispatch = useDispatch()
const getData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/get-cart-data`, {
      headers:{
        authToken:user.token
      }
    })
   // console.log('response',response)
    setProducts(response.data.products)
    setTotals(response.data.cartTotal)
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(() => {
  getData()
},[])

const emptyCart = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/empty-cart`, {
      headers:{
        authToken:user.token
      }
    })
    console.log('empty cart',response)
    setProducts([])
    setTotals(0)
    setDiscount(0)
    dispatch(addCoupon(false))
    localStorage.removeItem('cart')
    dispatch(addToCart({}))
  } catch (error) {
    console.log(error.message)
  }
}
const saveAddressToDb = async () => {
        try {
          const response = await axios.post(`http://localhost:5000/api/save-address`, {address}, {
                              headers:{
                                authToken:user.token
                              }
                          })
          console.log('save address',response)
          if(response.data.ok){
            setAddressSaved(true)
            toast.success("Address saved");
          }
        } catch (error) {
          console.log(error)
        }
};

const applyDiscountCoupon = async (e) => {
  e.preventDefault()
  console.log('coupon',coupon)
  try {
    const response = await applyCoupon(coupon,user.token)
    console.log('apply coupon response',response)
    if(response.data.success === true){
      toast.success(response.data.message)
      setDiscount(response.data.data)
      dispatch(addCoupon(true))
    }
    if(response.data.success === false){
      toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="row">
    <div className="col-md-6">
      <h4>Delivery Address</h4>
      <br />
      <br />
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
      <hr />
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscount(0);
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
      <h4>Got Coupon?</h4>
      <br />
      coupon input and apply button
    </div>

    <div className="col-md-6">
      <h4>Order Summary</h4>
      <hr />
      <p>Products {products.length}</p>
      <hr />
      <p>
        {products.map((p,i) => {
         return <div key={i}>
            <p>
              {p.product.title} ({p.color})  {p.count} = {p.product.price * p.count}
            </p>
          </div>
        })}
      </p>
      <hr />
      <p>Cart Total: {totals}</p>
      
      {discount > 0 && 
        <p className='bg-success p-2'>Your Total Billing Amount Is Now :{discount}</p> 
      }

      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary" disabled={!addressSaved || products.length < 1}>Place Order</button>
        </div>

        <div className="col-md-6">
          <button className="btn btn-primary" onClick={emptyCart}>Empty Cart</button>
        </div>
      </div>
    </div>
  </div>
 );
}

export default Checkout
