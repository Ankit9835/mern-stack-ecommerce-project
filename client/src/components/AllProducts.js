import React, { useState } from 'react'
import { Card, Skeleton, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from '../utils/raings';
import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';



const AllProducts = ({title,images,description,slug,product}) => {

  const dispatch = useDispatch()
  const cartRedux = useSelector((state) => state.cart)
  console.log('cart',cartRedux)
  const { Meta } = Card;
  const {label,setLabel} = useState('Add To Cart')
  const handleAddToCart = () => {
    let cart = []
    if(typeof window !== undefined){
      let cart = []
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.push({
        ...product,
        count:1
      })
      
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem('cart', JSON.stringify(unique))
      dispatch(addToCart({
        cart: unique
      }))
      //setLabel('Added')
    }
  }

  return (
    
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <>
        <Tooltip title={label}>
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>
        </Tooltip>
        </>,
      ]}
    >
      {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : 'No Rating Yet'}
      
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
   
  );
}

export default AllProducts
