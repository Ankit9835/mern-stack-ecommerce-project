import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../images/laptop.png";
import ProductListItem from "./ProductListItem";
import StarRating from "react-star-ratings";
import RatingModal from "./modal/RatingModal";

const { TabPane } = Tabs;

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
  _id,
  star,
  setStar,
  onStarClick,
  starRating
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

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>

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

            <RatingModal>
               <StarRating
                name={_id}
                numberOfStars={5}
                rating={starRating}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
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
