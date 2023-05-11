import { useState } from "react";
import { addCartProduct, deleteCartProduct } from "../../store/slices/cart";
import { useDispatch } from "react-redux";
import "./cardProduct.css";

const CartProduct = ({ product }) => {
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const handleClickTrash = () => {
    dispatch(deleteCartProduct(product.id));
  };

  const handleClickPlus = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    const price = product.product.price * newCounter;
    const updatedProduct = {
      id: product.id,
      quantity: newCounter,
      price,
    };
    dispatch(addCartProduct(updatedProduct));
  };

  const handleClickLess = () => {
    const newCounter = counter - 1;
    if (newCounter >= 1) {
      setCounter(newCounter);
      const price = product.product.price * newCounter;
      const updatedProduct = {
        id: product.id,
        quantity: newCounter,
        price,
      };
      dispatch(addCartProduct(updatedProduct));
    }
  };

  const price = product.product.price * counter;

  return (
    <section className="scroll-edit">
      <section className="grid grid-cols-[auto_1fr_auto] gap-3">
        <div className="h-[90px] aspect-square row-span-2 p-2">
          <img
            className="w-full h-full object-contain"
            src={product.product.images[0].url}
            alt=""
          />
        </div>
        <h4> {product.product.title} </h4>

        <span>
          <i
            onClick={handleClickTrash}
            className="bx bxs-trash text-red-600 cursor-pointer text-2xl pr-4  "
          ></i>
        </span>

        <div className="flex items-center">
          <button
            onClick={handleClickLess}
            className="border-[2px] p-3 px-5 hover:bg-red-600 hover:text-white transition-colors"
          >
            -
          </button>
          <span className="border-[2px] p-3 px-5 ">
            {product.quantity == 2 ? counter + 1 : counter}
          </span>
          <button
            onClick={handleClickPlus}
            className="border-[2px] p-3 px-5 hover:bg-red-600 hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      </section>

      <h4 className="text-end mt-3 pr-4 font-semibold text-gray-600 ">
        Total:
        <span className="font-bold pl-3 text-black ">{price.toFixed(2)}</span>
      </h4>
    </section>
  );
};

export default CartProduct;
