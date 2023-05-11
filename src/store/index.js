import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo";
import cart from "./slices/cart";

export default configureStore({
  reducer:{
    userInfo,
    cart
  }
})