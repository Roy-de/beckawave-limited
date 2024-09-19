import React, { useCallback, useReducer } from "react";
import axios from "axios";

import { productReducer } from "@/src/reducers/ProductReducers";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";
import { Product } from "@/types/types";
import { ProductContext, initialState } from "@/src/context/ProductContext";

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}products/get-all`);
      const data: Product[] = response.data;

      dispatch({ type: "SET_PRODUCTS", payload: data });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Successfully fetched products",
      });

      return data;
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching products" });

      return null;
    }
  }, [dispatch]);

  const createProducts = useCallback(async (product: Product) => {
    //TODO Create logic here
  }, []);

  const updateProduct = useCallback(async (product: Product) => {
    //TODO Update logic here
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    //TODO Delete logic here
  }, []);

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchProducts,
        createProducts,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
