import React, { createContext, useContext } from "react";

import { Store } from "@/types/types";
import { StoreAction, StoreState } from "@/types/states_and_actions";

export const initialState: StoreState = {
  stores: [],
  selectedStore: null,
  error: null,
  message: null,
};
interface StoreContextProps {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  fetchStores: () => Promise<Store[] | null>;
  createStore: (store: Store) => Promise<void>;
  deleteStore: (id: number) => Promise<void>;
}
export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined,
);

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a store provider");
  }

  return context;
};
