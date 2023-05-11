import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import PurchaseCard from "../components/Purchases/PurchaseCard";

const Purchases = () => {
  // Purchases es la parte en la cual vemos nuestros productos

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axiosEcommerce
      .get("purchases", getConfig())
      .then((res) => {
        const orderPurchases = res.data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt)
        );
        const orderPurchasesReverse = orderPurchases.slice(0, 3);
        setPurchases(orderPurchasesReverse);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="px-2">
      <section className="flex gap-2 items-center my-2">
        <Link to="/">Home</Link>
        <div className="h-[5px] aspect-square bg-red-600 rounded-full"></div>
        <span className="font-bold text-red-600"> Purchases </span>
      </section>

      <section className="grid gap-6 max-w-[1200px] mx-auto py-6 ">
        <h2 className="text-xl font-bold pt-4 minitablets:mt-7 ">
          My purchases
        </h2>
        {purchases.map((purchase) => (
          <>
            <PurchaseCard key={purchase.id} purchase={purchase} />
          </>
        ))}
      </section>
    </main>
  );
};

export default Purchases;
