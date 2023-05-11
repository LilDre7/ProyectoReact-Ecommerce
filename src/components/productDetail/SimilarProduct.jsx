import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import ProductCard from "../home/ProductCard";

const SimilarProduct = ({ categoryId, productId }) => {
  // *** Estado para los productos con el id *** //
  const [similiarProduct, setSimiliarProduct] = useState();

  // *** Efecto para las targetas ** //
  useEffect(() => {
    if (categoryId) {
      axiosEcommerce
        .get(`products?categoryId=${categoryId}`)
        .then((res) => {
          const otherProducts = res.data.filter((product) => product.id !== productId);
          setSimiliarProduct(otherProducts);
        })
        .catch((err) => console.log(err));
    }
  }, [categoryId, productId]);

  return (
    <section className="" >
      <h2 className="text-red-600 font-bold text-lg mb-6 text-center" >Discover similiar items</h2>
      <section 
      className=" mx-auto flex flex-col gap-5 ">
        {similiarProduct?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default SimilarProduct;
