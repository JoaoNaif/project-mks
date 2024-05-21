"use client";

import { BsCart4 } from "react-icons/bs";
import "../styles/components/header.sass";
import { motion, spring } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface Props {
  lengthCart: number;
  setModalCart: Dispatch<SetStateAction<boolean>>;
  modalCart: boolean;
}

export const Header = ({ lengthCart, setModalCart, modalCart }: Props) => {
  return (
    <motion.header
      initial={{ opacity: 0.5, y: -200, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0.5, y: -200, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0.5, x: -200, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0.5, x: -200, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        id="logo"
      >
        <h1>MKS</h1>
        <p>Sistemas</p>
      </motion.div>
      <motion.div
        id="cart"
        transition={{ duration: 0.3, type: spring, stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setModalCart(true)}
      >
        <BsCart4 className="icon-cart" />
        <span>{lengthCart}</span>
      </motion.div>
    </motion.header>
  );
};
