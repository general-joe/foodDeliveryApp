import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { restApi } from "../../appSetup/hook";
import { setUserInfo } from "../../appSetup/hook/user.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function SignUp({ setShowLogin, setCurrState }) {
  const [createClient, { isLoading }] = restApi.useCreateClientMutation();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  console.log(errors, "checking errors");
  const email = useWatch({
    name: "email",
    control,
  });
  const username = useWatch({
    name: "username",
    control,
  });
  const password = useWatch({
    name: "password",
    control,
  });

  console.log(email, "checking email value");
  console.log(username, "checking username value");
  console.log(password, "checking password value");
  const onSubmit = async (data) => {
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
    console.log(response, "Xxxxxxx");
    toast.success("Successful");
    setShowLogin(false);
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
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            maxLength: 20,
          })}
          placeholder="Your email"
          className="p-2 border border-gray-300 rounded-md"
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
          {errors.password && <p>{errors.password.message}</p>}
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
