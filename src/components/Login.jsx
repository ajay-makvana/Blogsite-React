import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
Link;
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // clean error
    try {
      const session = await authService.login(data); // always return session
      if (session) {
        const userData = await authService.getCurrentUser(); // using session info we get userInfo
        if (userData) {
          dispatch(storeLogin(userData)); // state update
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
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

          {/* SignIn msg  */}
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>

          {/* No account msg & redirect */}
          <p className="mt-2 text-center text-base - text-black/60">
            Don&apos;t have account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* if error showing it  */}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          {/* form  */}
          <form
            onSubmit={
              handleSubmit(login)
              //handleSubmit from react-hook-form's useForm()
            }
            className="mt-8"
          >
            <div className="space-y-5">
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

              {/* login button  */}

              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
