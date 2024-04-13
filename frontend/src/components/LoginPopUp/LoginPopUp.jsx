import React, { useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  loginAdminFx,
  registerAdminFx,
} from "../../appSetup/slices/admin/adminFunc";

const LoginPopUp = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.admin);
  const [currState, setCurrState] = useState("Login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData =
      currState === "Login"
        ? {
            email: data.email,
            password: data.password,
          }
        : {
            username: data.username,
            email: data.email,
            password: data.password,
          };
    const dataType =
      currState === "Login"
        ? loginAdminFx(userData)
        : registerAdminFx(userData);
    dispatch(dataType);
  };

  useEffect(() => {
    if (success) {
      toast.success("User Logged In, Successfully!");
      setShowLogin(false);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [success, setShowLogin, error]);

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        {/* Header & close button */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <form
          className="login-popup-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Form input fields */}
          <div className="login-popup-inputs">
            {currState !== "Login" && (
              <>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                    maxLength: 20,
                  })}
                  placeholder="Your name"
                />
                {errors.username && <p>{errors.username.message}</p>}
              </>
            )}
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                maxLength: 20,
              })}
              placeholder="Your email"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 10,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">
            {loading ? (
              <div className="loader"></div>
            ) : currState === "Sign Up" ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>
              By continuing, you agree to the terms of use & privacy policy.
            </p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
