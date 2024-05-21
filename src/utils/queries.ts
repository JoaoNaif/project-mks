import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api";

export const useProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return query;
};
