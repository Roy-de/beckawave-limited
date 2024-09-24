import React, { createContext, useContext } from "react";

import { StockAction, StockState } from "@/types/states_and_actions";
import { Stock } from "@/types/types";

export const initialState: StockState = {
  stock: [],
  error: undefined,
  message: undefined,
  selectedStock: null,
};

interface StockContextProps {
  state: StockState;
  dispatch: React.Dispatch<StockAction>;
  fetchInventory: () => Promise<Stock[] | []>;
  createStock: (stock: Stock) => Promise<String>;
  deleteStock: (id: number) => Promise<void>;
}

export const InventoryContext = createContext<StockContextProps | undefined>(
  undefined,
);

export const useInventory = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventory must be within an InventoryProvider");
  }
};
