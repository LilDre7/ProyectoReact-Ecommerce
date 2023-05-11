import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeIsShowCart } from "../../store/slices/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  const handleClickChangeSubmit = () => {
    if (!token) {
      navigate("/login");
    }
    dispatch(changeIsShowCart());
  };

  return (
    <section
      className="flex justify-between items-center p-5 bg-white border-b-2 border-black/40 
    fixed w-full pb-5 top-0 z-50  "
    >
      <Link to="/">
        <h1 className="text-lg  font-semibold sm:text-[25px]  ">
          Lil Dree Shop
        </h1>
      </Link>

      <nav className="flex items-center gap-6 text-xl sm:gap-9 sm:text-[22px]">
        <Link to="/login">
          <i className="bx bx-user sm:text-3xl "></i>
        </Link>
        <Link to="/purchases">
          <i className="bx bx-box sm:text-3xl "></i>
        </Link>
        <button onClick={handleClickChangeSubmit}>
          <i className="bx bx-cart-alt sm:text-3xl "></i>
        </button>
      </nav>
    </section>
  );
};

export default Header;
