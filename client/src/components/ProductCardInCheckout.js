import React from 'react'
import ModalImage from "react-modal-image";
import laptop from '../images/laptop.png'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';


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
            <td>{p.count}</td>
            <td>Shipping Icon</td>
            <td>Delete Icon</td>
          </tr>
        </tbody>
      );
}

export default ProductCardInCheckout
