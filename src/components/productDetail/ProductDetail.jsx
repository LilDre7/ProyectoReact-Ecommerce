import { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import SimilarProduct from "./SimilarProduct";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../store/slices/cart";

const stylePositionImages = {
  0: " -ml-[0%] ",
  1: " -ml-[100%] ",
  2: " -ml-[200%] ",
};

const ProductDetail = ({ productId }) => {
  // State para lo traer los id de nombre de los productos
  const [productData, setProductData] = useState();

  // Estado para el slicer
  const [image, setImage] = useState(0);

  const nextImage = () => {
    const newImage = image + 1;
    if (newImage <= 2) {
      setImage(newImage);
    } else {
      setImage(0);
    }
  };

  const prevImage = () => {
    const newImage = image - 1;
    if (newImage >= 0) {
      setImage(newImage);
    } else {
      setImage(2);
    }
  };

  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  const handleClickPlus = () => {
    setCounter(counter + 1);
  };

  const handleClickLess = () => {
    const newCounter = counter - 1;
    if (newCounter >= 1) {
      setCounter(newCounter);
    }
  };

  // Este es el efecto para traer el nombre de los productos //
  useEffect(() => {
    axiosEcommerce
      .get(`/products/${productId}`)
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, [productId]);

  const handleClickAddToCart = () => {
    dispatch(addCartProduct({ quantity: counter, productId: productData.id }));
    if (addCartProduct !== null ) {
      alert("Producto agregado al carrito");
    }
  }
  ;

  return (
    <>
      <section className="flex gap-2 items-center mt-24 pl-16 ">
        <Link to="/">Home</Link>
        <div className="h-[5px] aspect-square bg-red-600 rounded-full"></div>
        <span className="font-bold text-red-600"> {productData?.title} </span>
      </section>
      <section className="grid sm:grid-cols-2 gap-5 sm:mt-6 items-center max-w-[1000px] mx-auto">
        {/* slider */}
        <section className="overflow-hidden relative">
          <section
            className={`flex w-[300%] ${stylePositionImages[image]} transition-all duration-200 `}
          >
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[0].url}
                alt="No hay imagen"
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[1].url}
                alt="No hay imagen"
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[2].url}
                alt="No hay imagen"
              />
            </div>
          </section>
          <i
            onClick={prevImage}
            className="bx bxs-right-arrow absolute top-1/2 -translate-y-1/2 
          right-2 text-2xl text-red-600"
          ></i>
          <i
            onClick={nextImage}
            className="bx bxs-left-arrow absolute top-1/2 -translate-y-1/2 left-2 text-2xl text-red-600"
          ></i>
        </section>

        <section className="">
          <h4 className="text-gray-400 font-bold mt-6">{productData?.brand}</h4>
          <h3 className="font-bold text-lg ml-2"> {productData?.title} </h3>

          <section className="grid grid-cols-2">
            <article>
              <h4 className="font-bold text-lg ml-2">Price</h4>
              <span className="text-gray-400 font-bold sm:text-xl ">
                $ {productData?.price}
              </span>
            </article>

            <article>
              <h4 className="text-gray-400 font-bold">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={handleClickLess}
                  className="border-[2px] p-3 px-5 hover:bg-red-600 hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="border-[2px] p-3 px-5 "> {counter} </span>
                <button
                  onClick={handleClickPlus}
                  className="border-[2px] p-3 px-5 hover:bg-red-600 hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button
            onClick={handleClickAddToCart}
            className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400 hover:transition-colors mt-6`}
          >
            Add to card <i className="bx bx-cart"></i>
          </button>

          <p className="text-sm my-6"> {productData?.description} </p>
        </section>
      </section>

      <SimilarProduct
        productId={productData?.id}
        categoryId={productData?.categoryId}
      />
    </>
  );
};

export default ProductDetail;
