import React, { useState } from "react";
import "./LoginPopUp.css";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { restApi } from "../../appSetup/hook";
import { setUserInfo } from "../../appSetup/hook/user.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LoginValidator } from "./validate";

const SignIn = ({ setShowLogin, setCurrState }) => {
  const dispatch = useDispatch();

  const [login, { isLoading }] = restApi.useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: LoginValidator,
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    const response = await login(userData);

    if (response.error) {
      toast.error(response.error.data.message);
      return;
    }
    const { message, ...user } = response.data;
    dispatch(setUserInfo(user));
    toast.success("Successful");
    setShowLogin(false);
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            maxLength: 20,
          })}
          placeholder="Your email"
          className="p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
            className="w-full p-2 overflow-hidden border border-gray-300 rounded-md"
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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="p-2 text-center text-white rounded-md bg-tomato"
        >
          {isLoading ? <div className="loader"></div> : <span>Login</span>}
        </button>

        <p>
          Create a new account?{" "}
          <span
            onClick={() => setCurrState("Sign Up")}
            className="font-semibold cursor-pointer text-tomato"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
