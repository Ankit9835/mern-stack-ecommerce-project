import React from 'react'
import { Card, Skeleton } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from '../utils/raings';


const AllProducts = ({title,images,description,slug,product}) => {
  const { Meta } = Card;
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
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
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
