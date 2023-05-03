import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";
import { sideDrawer } from "../../redux/drawerSlice";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  console.log('drawer',drawer.drawer)
  console.log('cart',cart)
  
  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <>
      {cart.box.length > 0 ? <Drawer  onClose={() => {
    dispatch(sideDrawer(false));
  }} open={drawer.drawer ? drawer.drawer : false}>
    {/* {JSON.stringify(cart)} */}
    {cart.box.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() =>
            dispatch(sideDrawer(false))
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
  </Drawer> : ''}
    </>
  )
   
};

export default SideDrawer;
