import React, { useState } from "react";
import "./LoginPopUp.css";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { restApi } from "../../appSetup/hook";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { SignupValidator } from "./validate";

function SignUp({ setShowLogin, setCurrState }) {
  const [createClient, { isLoading }] = restApi.useCreateClientMutation();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: SignupValidator,
    mode: "all",
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await createClient(userData);
      if (response.error) {
        toast.error(response.error.data.message);
        return;
      }
      toast.success("Successful");
      setShowLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            maxLength: 20,
          })}
          placeholder="Your name"
          className="p-2 border border-gray-300 rounded-md"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

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

        <div className="flex items-start w-full gap-2 ">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, you agree to the terms of use & privacy policy.</p>
        </div>

        <button
          type="submit"
          className="p-2 text-center text-white rounded-md bg-tomato"
        >
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <span>Create Account</span>
          )}
        </button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => setCurrState("Login")}
            className="font-semibold cursor-pointer text-tomato"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
