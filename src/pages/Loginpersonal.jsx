import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, loginUser } from "../store/slices/userInfo";

const Loginpersonal = () => {

    // ** Use Form para el envio de datos ** //
    const { register, handleSubmit } = useForm();

    const { token, user } = useSelector((state) => state.userInfo);
  
    const dispatch = useDispatch();
  
    // ** Este submit es para el form de los usuarios ** //
    const submit = (data) => {
      console.log(data);
      dispatch(loginUser(data));
    };

    const handleLogout = () => {
      
    }
  
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-4 rounded-md sm:max-w-sm mx-auto text-xs"
      >
        <h2 className="text-xs font-semibold text-center minitablets:text-xl ">
          Welcome! Enter your email and password to continue.
        </h2>

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
                required: false,
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
                required: false,
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
      </form>
    </div>
  );
};

export default Loginpersonal;
