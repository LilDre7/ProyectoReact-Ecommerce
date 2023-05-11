import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";

const Home = () => {
  // ***** Aqui va nuestra logica ***** //

  // !! Este es el state para las categorias de nuestro home !! //
  const [categories, setCategories] = useState([]);

  // ?? Este estado es para obtener todos los productos ?? //
  const [products, setProducts] = useState([]);

  // *** Estado para obtener infomacion del input de busqueda *** //
  const [productName, setProductName] = useState("");

  // !! Estado para almacenar los id de los productis !! //
  const [currentCategory, setCurrenteCategory] = useState(0);

  // Boton para las categorias de los id
  const handleClickCategory = (e) => {
    const categoryId = Number(e.target.dataset.category);
    if (categoryId === 0) {
      setProductName("");
    }
    if ( categoryId !== 0 ) {
      setProductName("");
    }
    setCurrenteCategory(categoryId);
  };

  // ?? Boton para el submit de input ¡¡ //
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductName = e.target.productName.value;
    setProductName(newProductName);
    e.target.productName.value = "";
  };

  // ********* Filtrado para los productos por nombre ********** //
  const productByName = useMemo(() => {
    return products.filter((product) => {
      if (product.title.toLowerCase().includes(productName.toLowerCase())) {
        return true;
      }
      if (productName === "") {
        return true;
      }
      if (
        product &&
        product.title.toLowerCase().includes(productName.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [productName, products]);

  const filteredProducts = productByName.filter((product) => {
    if (product.title.toLowerCase().includes(productName.toLowerCase())) {
      return product;
    }
    if (product == "") {
      return product;
    }
    if (
      product.title.toLowerCase().includes(productName.toLowerCase()) == false
    ) {
      return product;
    }
  });

  // Efecto para las peteciones de las categorias
  useEffect(() => {
    if (currentCategory !== 0) {
      axiosEcommerce
        .get(`products?categoryId=${currentCategory}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  // Efecto para la categoria de productos
  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Efecto para obtener los productos de la categoria seleccionada
  useEffect(() => {
    if (currentCategory === 0) {
      axiosEcommerce
        .get("products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [currentCategory]);

  return (
    <main className="mt-14 minitablets:mt-14">
      {/* SECTION PARA MOSTRAR LAS CATEGORIAS */}
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-xl flex items-center pl-6 invisible ">
          Category
          <span className="ml-2 flex items-center ">
            <i className="bx bx-chevrons-down text-lg"></i>
          </span>
        </h2>
        <ul className="flex flex-wrap justify-center gap-5 p-3 minitablets:text-xl minitablets:p-5 ">
          <li
            className="cursor-pointer"
            onClick={handleClickCategory}
            data-category={0}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              className="cursor-pointer"
              onClick={handleClickCategory}
              data-category={category.id}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </form>

      {/* SECTION PARA MOSTRAR TODOS LOS PRODUCTOS */}
      <section className="">
        {/* Input de busqueda para los productos */}
        <form onSubmit={handleSubmit} className=" sm:flex sm:justify-start   ">
          <div className="flex justify-center gap-3 sm:mx-auto">
            <input
              id="productName"
              type="text"
              placeholder="What are you looking for"
              className="p-3 border-2 border-black rounded-lg outline-none minitablets:w-[400px] "
            />
            <button className="p-3 border-2 border-black rounded-lg sm:w-[80px] hover:bg-black hover:text-white transition-colors ">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>

        {/* Section de los productos en el home */}
        <section className="grid gap-5 mt-5 w-full minitablets:grid minitablets:grid-cols-2 minitablets:gap-5 minitablets:p-1 minitablets:w-full sm:grid sm:grid-cols-1 sm:content-center ">
          {filteredProducts.length === 0 ? (
            <p className="text-center">
              No se encontraron productos que coincidan con tu búsqueda
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default Home;
