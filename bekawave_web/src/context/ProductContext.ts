import React, { createContext, useContext } from "react";

import { Product } from "@/types/types";
import { ProductAction, ProductState } from "@/types/states_and_actions";

export const initialState: ProductState = {
  product: [],
  selectedProduct: null,
  error: null,
  message: null,
};

interface ProductContextProps {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: () => Promise<Product[] | null>;
  createProducts: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("useProduct must be used within a product provider");

  return context;
};
