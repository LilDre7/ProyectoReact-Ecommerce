import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginUser } from "../store/slices/userInfo";
import Loginpersonal from "./Loginpersonal";

const Login = () => {
  // ** Use Form para el envio de datos ** //
  const { register, handleSubmit } = useForm();

  const { token, user } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  // ** Este submit es para el form de los usuarios ** //
  const submit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <main className=" bg-gray-200 flex justify-center items-center h-screen ">
      {token ? (
        <section className="bg-blue-400/50 p-6 rounded-lg grid items-center">
          <h3 className="text-[20px] font-medium text-center p-4capitalize">
            Welcome to your dashboard
          </h3>

          <div className="text-center">
            <i className="bx bx-child text-5xl p-4 hover:bg-blue-800 duration-150 transition-colors"></i>
          </div>

          <h2 className="text-xl font-semibold  text-center mt-[-10px] p-3 underline  capitalize">
            {user?.firstName} {user?.lastName}
          </h2>
          <button
            onClick={handleClickLogout}
            className="bg-red-400 text-white py-2 mt-3 block rounded-md w-full hover:bg-red-800 duration-150 transition-colors "
          >
            LogOut
          </button>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white p-4 rounded-md sm:max-w-sm mx-auto text-xs"
        >
          <h2 className="text-xs font-semibold text-center minitablets:text-xl ">
            Welcome! Enter your email and password to continue.
          </h2>

          <section className="mt-7 bg-blue-400/50 p-4 rounded-lg grid items-center ">
            <h5 className="text-center p-1 minitablets:text-sm ">Test data</h5>

            <div className="p-1 font-semibold">
              <i className="bx bx-envelope font-medium "></i>
              <span className="minitablets:text-lg"> john@gmail.com </span>
            </div>

            <div className="p-1 font-semibold">
              <i className="bx bx-lock-alt font-medium "></i>
              <span className="minitablets:text-lg"> john1234 </span>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-4">
            <div>
              <label
                className="grid grid-rows-1 pb-2 font-bold text-base"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border-2 border-black rounded-md w-full p-2 "
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>

            <div>
              <label
                className="grid grid-rows-1 pb-2 font-bold text-base"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border-2 border-black rounded-md w-full p-2 "
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
          </section>

          <button
            className="bg-blue-400 text-white mb-5 py-2 block rounded-md w-full mt-5 hover:bg-blue-500 
          transition-colors minitablets:text-lg "
          >
            Login
          </button>

          <span className="font-medium minitablets:text-base ">
            Don't have an account?
            <NavLink
              className="text-blue-600 cursor-pointer hover:text-red-500 transition-colors pl-3 "
              to="/Loginpersonal"
            >
              Sign Up 
            </NavLink>
          </span>
        </form>
      )}
    </main>
  );
};

export default Login;
