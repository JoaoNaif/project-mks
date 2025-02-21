import axios from "axios";
import { Product } from "@/types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const result = await axios.get(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC"
  );
  return result.data.products;
};
