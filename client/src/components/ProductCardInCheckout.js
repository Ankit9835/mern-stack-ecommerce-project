import React from 'react'
import ModalImage from "react-modal-image";
import laptop from '../images/laptop.png'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
  } from "@ant-design/icons";


const ProductCardInCheckout = ({p}) => {
    const dispatch = useDispatch()
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];
    const handleColorChange = (e) => {
        
        console.log('color', e.target.value)
        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product,i) => {
            if(product._id === p._id){
                cart[i].color = e.target.value
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))

        console.log('cart system',cart)
       
        dispatch(addToCart(cart))
       
    }

    const handleQuantityChange = (e) => {
        console.log('quantity', e.target.value)
        
        let cart = []
        if(typeof window !== 'undefined'){

            if(localStorage.getItem('cart')){
              cart = JSON.parse(localStorage.getItem('cart'))
            }
    
            cart.map((product,i) => {
                if(product._id === p._id){
                    cart[i].count = parseInt(e.target.value)
                }
            })
    
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(addToCart(cart))
        }
    }

    const handleRemove = (e) => {
        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                  cart.splice(i, 1);
                }
              });

            localStorage.setItem('cart',JSON.stringify(cart))
            dispatch(addToCart(cart))
        }
    }

    return (
        <tbody>
          <tr>
            <td>
            <div style={{ width: "100px", height: "auto" }}>
                {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />)
                
 : (<ModalImage small={laptop} large={laptop} />)} 
 </div>
 </td>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>{p.brand}</td>
            <td>
            <select
                onChange={handleColorChange}
                name="color"
                className="form-control"
            >
                {p.color ? (<option value={p.color}>{p.color}</option>) : 
                   ( <option>Select</option> )
                }
                {colors.filter((f) => f != p.color).map((c) => {
                   return <option key={c} value={c}>
                     {c}
                   </option> 
                })}
            </select>
            </td>
            <td className="text-center">
                <input
                    type="number"
                    className="form-control"
                    value={p.count}
                    onChange={handleQuantityChange}
                />
             </td>
            <td>{p.shipping == 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}</td>
            <td>
            <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
            </td>
          </tr>
        </tbody>
      );
}

export default ProductCardInCheckout
