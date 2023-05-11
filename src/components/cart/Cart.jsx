import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  changeIsShowCart,
  getCartProducts,
  purchaseCart,
} from "../../store/slices/cart";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isShowCart, products } = useSelector((store) => store.cart);

  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const handleClickChangeClose = () => {
    dispatch(changeIsShowCart());
  };

  useEffect(() => {
    if (isShowCart) {
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const handleClickCheckout = () => {
    alert("Compra completada");
    dispatch(purchaseCart());
  };

  return (
    <section
      className={`fixed z-50  w-full top-[50px] bg-white h-screen sm:w-[500px] shadow-xl 
      ${isShowCart && token ? "right-0" : "-right-full "} 
      duration-200 p-3 grid grid-rows-[auto_1fr_auto] `}
    >
      <h2 className="text-xl font-bold"> Shopping Cart </h2>
      <i
        onClick={handleClickChangeClose}
        className="bx bx-x absolute top-2 right-3 text-xl 
      cursor-pointer hover:text-red-700"
      ></i>

      {/* Productos del carrito xd */}
      <section className=" scroll-edit overflow-y-scroll grid gap-10 py-4 ">
        {products.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </section>

      {/* Checkout */}
      <section className="border-t-[2px] border-gray-300 py-12 grid grid-rows-[auto_1fr_auto] ">
        <div className="grid grid-cols-2 gap-4 mb-7 ">
          <span className="font-bold text-gray-500 text-xl ">Subtotal</span>
          <h4 className="font-bold text-xl ">
            <span className="text-green-400">$</span> {totalPrice.toFixed(2)}
          </h4>
        </div>
        <button
          onClick={handleClickCheckout}
          className="cols-span-2 bg-red-400 w-full py-3 text-white "
        >
          Checkout
        </button>
      </section>
    </section>
  );
};

export default Cart;
