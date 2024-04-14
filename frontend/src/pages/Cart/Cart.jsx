import { restApi } from "../../appSetup/hook";
import { removeFromCart } from "../../appSetup/slice/cart.slice";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { data } = restApi.useGetRecipiesQuery();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {data?.recipes
          ?.filter((recipe) => cartItems.includes(recipe.id))
          ?.map((item) => {
            return (
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.item} alt="" />
                  <p>{item.title}</p>
                  <p>GH{item.price}</p>
                  <p>{1}</p>
                  <p>GH{item.price * 1}</p>
                  <p onClick={() => removeFromCart(item.id)} className="cross">
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
              {getTotalCartAmount(
                data?.recipes?.filter((recipe) => cartItems.includes(recipe.id))
              )}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>
              GH
              {getTotalCartAmount(
                data?.recipes?.filter((recipe) => cartItems.includes(recipe.id))
              ) === 0
                ? 0
                : 2}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              GH
              {getTotalCartAmount(
                data?.recipes?.filter((recipe) => cartItems.includes(recipe.id))
              ) === 0
                ? 0
                : getTotalCartAmount(
                    data?.recipes?.filter((recipe) =>
                      cartItems.includes(recipe.id)
                    )
                  ) + 2}
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

const getTotalCartAmount = (products) => {
  return products?.reduce(
    (accumulator, product) => accumulator + Number(product.price),
    0
  );
};

export default Cart;
