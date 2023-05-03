import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ProductCardInCheckout from '../components/ProductCardInCheckout'
import { userCart } from '../utils/cart'
import axios from 'axios'

const Cart = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const {box} = useSelector((state) => state.cart) 
 const {user} = useSelector((state) => state.auth)
 const token = user.token
 console.log('user',user.token)
 console.log('car',box)
 const getTotal = () => {
    return box.reduce((currentValue,nextValue) => {
        return currentValue + nextValue.price * nextValue.count
    },0)
 }
//console.log('process',process.env.REACT_APP_API)
 const proceedToCheckout = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/api/add-cart`, {box}, {
      headers:{
        authToken:token 
      }
  })
    if(response.data.ok){
      navigate('/checkout')
    }
  } catch (error) {
    console.log('cart save err', error)
  }
  
 }

 const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {box.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
 return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {box.length} Product</h4>

          {!box.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {box.map((c) => (
            <div key={c._id}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user.email ? (
            <button className="btn btn-sm btn-primary mt-2" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary mt-2">
                 
                Login to Checkout
              
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart
