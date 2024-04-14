import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { addToCart, removeFromCart } from "../../appSetup/hook/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
const FoodItem = ({ id, name, price, description, image }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddToCart = (id) => {
    if (!user?.email) {
      setShowLogin(true);
    } else {
      dispatch(addToCart(id));
    }
  };
  return (
    <div>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="food-item">
        <div className="food-item-img-container">
          <img
            className="w-64 h-64 food-item-image skeleton"
            src={image}
            alt=""
          />
          {!cartItems[id] ? (
            <button
              onClick={() => {
                handleAddToCart(id);
              }}
              className="add"
            >
              <img src={assets.add_icon_white} alt="" />
            </button>
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => dispatch(removeFromCart(id))}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => {
                  dispatch(addToCart(id));
                }}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-description">{description}</p>
          <p className="food-item-price">GH{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
