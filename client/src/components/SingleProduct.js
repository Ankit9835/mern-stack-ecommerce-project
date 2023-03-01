import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../images/laptop.png";
import ProductListItem from "./ProductListItem";

const { Meta } = Card;

const SingleProduct = ({
  title,
  description,
  images,
  slug,
  price,
  category,
  subs,
  shipping,
  color,
  brand,
  quantity,
  sold,
}) => {
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3" />}></Card>
        )}
      </div>

      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
          <ProductListItem
            title={title}
            description={description}
            images={images}
            price={price}
            category={category}
            subs={subs}
            shipping={shipping}
            color={color}
            brand={brand}
            quantity={quantity}
            sold={sold}
          />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
