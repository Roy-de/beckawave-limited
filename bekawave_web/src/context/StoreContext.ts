import React, { createContext, useContext } from "react";

import { Store } from "@/types/types";
import { StoreAction, StoreState } from "@/types/states_and_actions";

export const initialState: StoreState = {
  stores: [],
  selectedStore: null,
  error: null,
  message: null,
};

export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  fetchStores: () => Promise<void>;
  createStore: (store: Store) => Promise<void>;
  deleteStore: (id: number) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  fetchStores: async () => {},
  createStore: async () => {},
  deleteStore: async () => {},
});

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a store provider");
  }

  return context;
};
