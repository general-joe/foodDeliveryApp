import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { restApi } from "../../appSetup/hook";
import { setUserInfo } from "../../appSetup/hook/user.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginPopUp = ({ setShowLogin }) => {
  const dispatch = useDispatch();

  const [createClient, { isLoading }] = restApi.useCreateClientMutation();
  const [login, { isLoading: loginLoading }] = restApi.useLoginUserMutation();
  const [currState, setCurrState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
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
    const response =
      currState === "Login"
        ? await login(userData)
        : await createClient(userData);
    if (response.error) {
      reset();
      toast.error(response.error.message);
    }
    if (currState === "Login") {
      const { message, ...user } = response.data;
      dispatch(setUserInfo(user));
      if (message === "Rejected") {
        toast.error(message);
      }
      toast.success(message);
    }
    reset();
    toast.success("Successful");
    setShowLogin(false);
  };

  return (
    <div className="fixed inset-0 z-[1] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-[330px] p-6 bg-white text-gray-800 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-tomato">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
            className="w-4 cursor-pointer"
          />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {currState !== "Login" && (
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                maxLength: 20,
              })}
              placeholder="Your name"
              className="border border-gray-300 rounded-md p-2"
            />
          )}
          {errors.username && <p>{errors.username.message}</p>}
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              maxLength: 20,
            })}
            placeholder="Your email"
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <div className="relative">
            <input
              type={!showPassword ? "password" : "text"}
              {...register("password", {
                required: true,
                maxLength: 10,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 overflow-hidden w-full"
            />
            <span className="absolute top-[2px] right-0  p-2">
              {showPassword ? (
                <IoEyeOutline
                  fontSize={22}
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  fontSize={22}
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:cursor-pointer"
                />
              )}
            </span>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-tomato text-white rounded-md p-2 text-center"
          >
            {isLoading || loginLoading ? (
              <div className="loader"></div>
            ) : currState === "Sign Up" ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
          {currState === "Sign Up" ? (
            <div className="flex items-start w-full gap-2 ">
              <input type="checkbox" required className="mt-1" />
              <p>
                By continuing, you agree to the terms of use & privacy policy.
              </p>
            </div>
          ) : (
            <></>
          )}
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-tomato font-semibold cursor-pointer"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-tomato font-semibold cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
