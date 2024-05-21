"use client";

import { useProducts } from "@/utils/queries";
import "../styles/components/main.sass";
import { LayoutProducts } from "./LayoutProducts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cartTypeList } from "@/types/CartTypeList";
import { LayoutCart } from "./LayoutCart";
import { motion } from "framer-motion";

interface Props {
  modalCart: boolean;
  setModalCart: Dispatch<SetStateAction<boolean>>;
  setLenghtCart: Dispatch<SetStateAction<number>>;
}

export const MainProducts = ({
  modalCart,
  setModalCart,
  setLenghtCart,
}: Props) => {
  const { data, isLoading } = useProducts();
  const [listCart, setListCart] = useState<cartTypeList[]>([]);

  useEffect(() => {
    setLenghtCart(listCart.length);
  }, [listCart]);

  const addItens = (id: number) => {
    if (listCart.length !== 0 && listCart.map((i) => i.id).includes(id)) {
      setListCart((prevListCart) =>
        prevListCart.map((item) =>
          item.id === id ? { ...item, qtd: item.qtd++ } : item
        )
      );
    } else {
      const newId = {
        id: id,
        qtd: 1,
      };

      setListCart([...listCart, newId]);
    }
  };

  const decreaseItem = (id: number) => {
    setListCart((prevListCart) =>
      prevListCart
        .map((item) => (item.id === id ? { ...item, qtd: item.qtd-- } : item))
        .filter((i) => i.qtd > 0)
    );
  };

  const removeItem = (id: number) => {
    const newList = listCart.filter((i) => i.id !== id);
    setListCart(newList);
  };

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "200%", opacity: 0 },
  };

  return (
    <main id="container-main">
      {isLoading && (
        <motion.p
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.5,
            loop: Infinity,
            ease: "linear",
          }}
          className="loading"
        ></motion.p>
      )}
      {data && (
        <ul id="container-grid">
          {data.map((item, i) => (
            <LayoutProducts
              key={item.id}
              item={item}
              addItens={addItens}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </ul>
      )}

      {modalCart && (
        <LayoutCart
          initial={"closed"}
          animate={modalCart ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.3 }}
          addItens={addItens}
          item={data}
          listCart={listCart}
          setModalCart={setModalCart}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          modalCart={modalCart}
        />
      )}
    </main>
  );
};
