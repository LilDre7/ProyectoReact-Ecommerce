import { Link, useParams } from "react-router-dom";
import ProductDetail from "../components/productDetail/ProductDetail";

const Product = () => {
  // !! El id de los productos se obtiene de la url !! //
  const { id } = useParams();

  return (
    <main className="px-2">
        <ProductDetail productId={id} />
    </main>
  );
};

export default Product;
