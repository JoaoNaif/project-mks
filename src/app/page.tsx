"use client";

import { Header } from "@/components/Header";
import "../styles/components/page.sass";
import { MainProducts } from "@/components/MainProducts";
import { useState } from "react";

function Page() {
  const [modalCart, setModalCart] = useState<boolean>(false);
  const [lengthCart, setLengthCart] = useState<number>(0);

  return (
    <div className="container">
      <Header
        lengthCart={lengthCart}
        setModalCart={setModalCart}
        modalCart={modalCart}
      />
      <MainProducts
        modalCart={modalCart}
        setModalCart={setModalCart}
        setLenghtCart={setLengthCart}
      />
      <footer className="footer">
        MKS sistemas © Todos os direitos reservados
      </footer>
    </div>
  );
}

export default Page;
