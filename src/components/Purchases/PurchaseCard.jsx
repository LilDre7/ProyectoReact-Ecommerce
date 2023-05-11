import React from "react";

const PurchaseCard = ({ purchase }) => {
  return (
    <>
      <article 
        className="grid grid-cols-2 items-center justify-between p-4 border-2 border-black rounded-md minitablets:max-w-[1000px]  minitablets:mx-auto ">
        <section 
        className=" flex flex-col items-center justify-center gap-2 minitablets:max-w-[800px] ">
          <div className="h-[50px] aspect-square">
            <img
              className="h-full sm:h-[90px] w-full object-contain"
              src={purchase.product.images[2].url}
              alt=""
            />
          </div>
          <span className="text-center flex items-center justify-center flex-wrap w-[400px] p-5" >{purchase.product.title}</span>
        </section>

        <section className="flex flex-col items-center justify-center gap-2 ">
          {/* <span> {formatDateDDMMYYYY(purchase.createdAt)} </span> */}
          <div>
            <span 
            className="border-2 border-black pl-5 pr-5 p-1 rounded
            text-base">{purchase.quantity}</span>
          </div>
          <div>
            <span>
              $ {(purchase.product.price * purchase.quantity).toFixed(2)}
            </span>
          </div>
        </section>
      </article>
    </>
  );
};

export default PurchaseCard;
