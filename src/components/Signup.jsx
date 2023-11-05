import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo, Button, Input } from "./index";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";
import { login as storeLogin } from "../store/authSlice";
import { Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          {/* adding Logo  */}
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>

          {/* Signup msg  */}
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>

          {/* already account msg & redirect */}
          <p className="mt-2 text-center text-base - text-black/60">
            Already have account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>

          {/* if error showing it  */}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          {/* form  */}
          <form
            onSubmit={
              handleSubmit(signup)
              //handleSubmit from react-hook-form's useForm()
            }
            className="mt-8"
          >
            <div className="space-y-5">
              {/* name input field  */}
              <Input
                label="Name: "
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
              />

              {/* Email input field  */}
              <Input
                label="Email : "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />

              {/* password input field  */}
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />

              {/* signup button  */}

              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
