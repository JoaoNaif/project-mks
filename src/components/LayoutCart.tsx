"use client";

import { cartTypeList } from "@/types/CartTypeList";
import { Product } from "@/types/Product";
import { motion, spring } from "framer-motion";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../styles/components/layoutCart.sass";
import { IoIosCloseCircle } from "react-icons/io";

interface Props extends ComponentProps<typeof motion.div> {
  item: Product[] | undefined;
  addItens: (id: number) => void;
  listCart: cartTypeList[];
  setModalCart: Dispatch<SetStateAction<boolean>>;
  removeItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  modalCart: boolean;
}

export const LayoutCart = ({
  item,
  listCart,
  addItens,
  setModalCart,
  removeItem,
  decreaseItem,
  modalCart,
  ...props
}: Props) => {
  const listIdCart = listCart.map((i) => i.id);
  const filter = item?.filter((i) => listIdCart.includes(i.id));
  const total = filter?.reduce((acc, i) => {
    const foundItem = listCart.find((item) => item.id === i.id);
    if (foundItem) {
      return acc + foundItem.qtd * i.price;
    }
    return acc;
  }, 0);

  return (
    <motion.div id="container-cart" {...props}>
      <div className="header-cart">
        <h1 className="title-cart">
          Carrinho <br /> de Compras
        </h1>
        <motion.div
          transition={{ duration: 0.3, type: spring, stiffness: 300 }}
          whileHover={{ scale: 1.1 }}
          className="icon-cart"
          onClick={() => setModalCart(false)}
        >
          <IoIosCloseCircle />
        </motion.div>
      </div>
      <ul id="list-products-cart">
        {filter?.map((item, i) => (
          <motion.li
            key={item.id}
            className="products-cart"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <motion.div
              transition={{ duration: 0.3, type: spring, stiffness: 300 }}
              whileHover={{ scale: 1.1 }}
              className="close-card-button"
              onClick={() => removeItem(item.id)}
            >
              <IoIosCloseCircle />
            </motion.div>
            <figure className="figure-cart">
              <img
                src={item.photo}
                alt="Produtos do carrinho"
                className="image-cart"
              />
            </figure>
            <p className="name-cart">{item.name}</p>
            <div className="container-price">
              {listCart.map((i) => (
                <span key={i.id}>
                  {item.id === i.id && (
                    <div className="info-cart">
                      <div className="container-qtd">
                        <p className="qtd-cart">Qtd:</p>
                        <div className="container-action">
                          <FaMinus
                            onClick={() => decreaseItem(item.id)}
                            className="action-icon-cart"
                          />
                          <p className="p-cart">{item.id === i.id && i.qtd}</p>
                          <FaPlus
                            onClick={() => addItens(item.id)}
                            className="action-icon-cart"
                          />
                        </div>
                      </div>
                      <h3 className="price-cart">
                        {item.id === i.id && `R$${item.price * i.qtd}`}
                      </h3>
                    </div>
                  )}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
      {total !== undefined && total > 0 ? (
        <div className="total-cart">
          <span>Total:</span>
          <h3>R${total}</h3>
        </div>
      ) : (
        <div className="total-cart">Adicione Itens ao Carrinho</div>
      )}
      <button className="finish-buy-cart">Finalizar Compra</button>
    </motion.div>
  );
};
