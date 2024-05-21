"use client";

import { Product } from "@/types/Product";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { ComponentProps } from "react";
import "../styles/components/layoutProducts.sass";

interface Props extends ComponentProps<typeof motion.li> {
  item: Product;
  addItens: (id: number) => void;
}

export const LayoutProducts = ({ item, addItens, ...props }: Props) => {
  return (
    <motion.li key={item.id} className="container-products" {...props}>
      <figure className="products-figure">
        <img
          src={item.photo}
          alt="Fotos dos Produtos"
          className="products-image"
        />
      </figure>
      <div className="container-info">
        <div className="first-container-info">
          <h1 className="name-product-info">{item.name}</h1>
          <span className="price-product-info">R${item.price}</span>
        </div>
        <p className="desc-product-info">{item.description}</p>
      </div>
      <button className="button-buy-info" onClick={() => addItens(item.id)}>
        <RiShoppingBag3Fill className="button-icon-bag" />
        <h1 className="button-buy">COMPRAR</h1>
      </button>
    </motion.li>
  );
};
