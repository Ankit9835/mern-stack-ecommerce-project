import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCardInCheckout from '../components/ProductCardInCheckout'


const Cart = () => {
 const dispatch = useDispatch()
 const {box} = useSelector((state) => state.cart) 
 const {user} = useSelector((state) => state.auth)
 console.log('user',user)
 console.log('car',box)
 const getTotal = () => {
    return box.reduce((currentValue,nextValue) => {
        return currentValue + nextValue.price * nextValue.count
    },0)
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
            <button className="btn btn-sm btn-primary mt-2">
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
