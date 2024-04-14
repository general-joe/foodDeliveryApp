import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQty } from "../../appSetup/hook/cart.slice";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems?.map((item) => {
          return (
            <div key={item.id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>GH{item.price}</p>
                <div className="flex items-center gap-2">
                  <p
                    className="px-3 text-lg border rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      const c = cartItems?.find((x) => x.id === item.id);
                      if (c.quantity > 1) {
                        dispatch(updateCartQty({ id: item.id, quantity: -1 }));
                      }
                    }}
                  >
                    -
                  </p>
                  <p className="text-lg">{item.quantity}</p>
                  <p
                    className="px-3 text-lg border rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      dispatch(updateCartQty({ id: item.id, quantity: 1 }));
                    }}
                  >
                    +
                  </p>
                </div>
                <p>GH {item.price * item.quantity}</p>
                <p
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="cross"
                >
                  x
                </p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>
              GH
              {getTotalCartAmount(cartItems)}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>
              GH
              {getTotalCartAmount(cartItems) === 0 ? 0 : 2}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              GH
              {getTotalCartAmount(cartItems) === 0
                ? 0
                : getTotalCartAmount(cartItems) + 2}
            </b>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getTotalCartAmount = (products) => {
  return products?.reduce(
    (accumulator, product) =>
      accumulator + Number(product.price) * product.quantity,
    0
  );
};

export default Cart;
