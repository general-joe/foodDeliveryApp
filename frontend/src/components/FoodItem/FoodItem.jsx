import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { addToCart, removeFromCart } from "../../appSetup/hook/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
const FoodItem = ({ id, name, price, description, image }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <LazyLoadImage
          className="w-64 h-64 food-item-image skeleton"
          src={image}
          alt=""
        />
        {/* {!cartItems[id] ? (
          <button
            onClick={() => {
              dispatch(addToCart({ id, name, price, description, image }));
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
            <p> des {cartItems[id]}</p>
            <img
              onClick={() => {
                dispatch(addToCart({ id, name, price, description, image }));
              }}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )} */}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <div className="flex justify-between">
          <p className="food-item-price">GH{price}</p>
          {cartItems?.find((item) => item.id === id) ? (
            <div className="cursor-pointer ">
              <img
                onClick={() => dispatch(removeFromCart(id))}
                src={assets.remove_icon_red}
                alt=""
              />
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    id,
                    name,
                    price,
                    description,
                    image,
                    quantity: 1,
                  })
                );
              }}
              className="add"
            >
              <img src={assets.add_icon_white} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
