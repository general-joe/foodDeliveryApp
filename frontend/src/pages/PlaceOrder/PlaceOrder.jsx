import "./PlaceOrder.css";
import { useSelector } from "react-redux";
import { getTotalCartAmount } from "../Cart/Cart";
import { restApi } from "../../appSetup/hook";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { data } = restApi.useGetRecipiesQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createOrder, { isLoading }] = restApi.useCreateOrderMutation();

  const onSubmit = async (payload) => {
    const orderInfo = {
      ...payload,
      clientId: user.id,
      recipe: cartItems,
      deliveryFee:
        getTotalCartAmount(
          data?.recipes?.filter((recipe) => cartItems.includes(recipe.id))
        ) === 0
          ? 0
          : 2,
      subTotal: getTotalCartAmount(
        data?.recipes?.filter((recipe) => cartItems.includes(recipe.id))
      ),
    };
    console.log(orderInfo);
    const response = await createOrder(orderInfo);
    if (response.error) {
      console.log("Error", response.error);
    }
    toast.success("Order Placed Successfully!");
    navigate("/");
  };

  return (
    <form className="place-order" onSubmit={handleSubmit(onSubmit)}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            {...register("firstname", { required: true })}
            placeholder="First Name"
          />
          {errors.firstname && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            type="text"
            {...register("lastname", { required: true })}
            placeholder="Last Name"
          />
          {errors.lastname && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email Address"
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
        <input
          type="text"
          {...register("street_name", { required: true })}
          placeholder="Street Name"
        />
        {errors.street && (
          <span className="text-red-500">This field is required</span>
        )}
        <div className="multi-fields">
          <input
            type="text"
            {...register("city", { required: true })}
            placeholder="City"
          />
          {errors.city && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            type="text"
            {...register("state", { required: true })}
            placeholder="State"
          />
          {errors.state && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="multi-fields">
          <input
            type="number"
            {...register("zipcode", { required: true })}
            placeholder="Zip Code"
          />
          {errors.zip_code && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            type="text"
            {...register("country", { required: true })}
            placeholder="Country"
          />
          {errors.country && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <input
          type="text"
          {...register("phonenumber", { required: true })}
          placeholder="Phone Number"
        />
        {errors.phonenumber && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="place-order-right">
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
          <button type="submit">
            {isLoading ? <div className="loader"></div> : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
