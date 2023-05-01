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
import { showAverage } from "../utils/raings";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";


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
  starRating,
  singleProduct
  
}) => {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    let cart = []
    if(typeof window !== undefined){
      let cart = []
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.push({
        ...singleProduct,
        count:1
      })
      
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem('cart', JSON.stringify(unique))
      dispatch(addToCart({
        cart:unique
      }))
      //setLabel('Added')
    }
  }
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
             <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
              </a>
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
          {singleProduct && singleProduct.ratings && singleProduct.ratings.length > 0 ? showAverage(singleProduct) : 'No Rating Yet'}
          
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
