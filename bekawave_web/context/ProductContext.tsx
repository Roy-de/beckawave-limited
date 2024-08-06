import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { Product } from "@/types/types";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";
import axios from "axios";
import { d } from "@nextui-org/slider/dist/use-slider-a94a4c83";

interface ProductState {
  product: Product[];
  selectedProduct: Product | null;
}

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product };

const initialState: ProductState = {
  product: [],
  selectedProduct: null,
};

const productReducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, product: action.payload };
    case "DELETE_PRODUCT":
      return {
        ...state,
        product: state.product.filter((p) => p.product_id !== action.payload),
      };
    case "ADD_PRODUCT":
      return { ...state, product: [...state.product, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: state.product.map((p) =>
          p.product_id === action.payload.product_id ? action.payload : p,
        ),
      };
    default:
      return state;
  }
};

interface ProductContextProps {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: () => void;
  createProducts: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = useCallback(async () => {
    try{
      const response = await axios.get(`${BACKEND_URL}products/all`);
      const data: Product[] = response.data;

      dispatch({ type: "SET_PRODUCTS", payload: data });
    }catch (e) {
      console.error("Error occurred: ", e);
    }
  }, []);

  const createProducts = useCallback(async (product: Product) => {
    // Create logic here
  }, []);

  const updateProduct = useCallback(async (product: Product) => {
    // Update logic here
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    // Delete logic here
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

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("useProduct must be used within a store provider");

  return context;
};
