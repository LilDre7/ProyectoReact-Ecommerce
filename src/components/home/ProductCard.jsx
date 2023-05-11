import { useDispatch } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { addCartProduct } from "../../store/slices/cart";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Funcion para comprar producto
  const handleClickAddProduct = (e) => {
    alert("Producto agregado al carrito");
    e.preventDefault();
    dispatch(addCartProduct({ productId: product.id, quantity: 1 }));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="border-[1px] border-[#e5e5e5] rounded-md w-[300px] mx-auto sm:w-[600px] lg:w-[1000px] "
    >
      <div className="p-5 border-b-[1px] border-[#e5e5e5] h-[200px] sm:h-[260px] overflow-hidden relative group">
        <img
          className="h-full w-full object-contain group-hover:opacity-0 
          transition-opacity duration-200 "
          src={product.images[0].url}
          alt=""
        />
        <img
          className="h-full w-full object-contain absolute top-0 left-0 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300"
          src={product.images[1].url}
          alt=""
        />
      </div>
      <section className="p-4 relative">
        <h4 className="text-gray-400 font-bold">{product.brand}</h4>
        <h3 className="font-bold text-sm ml-3 sm:text-lg ">{product.title}</h3>
        <h4 className="text-gray-400 font-bold">Price</h4>
        <span className="text-gray-400 font-bold ml-3 ">{product.price}</span>
        <button
          onClick={handleClickAddProduct}
          className="absolute right-4 bottom-4 bg-[#ff9f00] p-2 rounded-full text-xl w-[50px] aspect-square hover:bg-red-600 
          transition-colors"
        >
          <i className="bx bx-cart"></i>
        </button>
      </section>
    </Link>
  );
};

export default ProductCard;
