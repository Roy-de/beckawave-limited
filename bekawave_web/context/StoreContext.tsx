import React, { createContext } from "react";

import { Store } from "@/types/types";

interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
}

type Action =
  | { type: "SET_STORES"; payload: Store[] }
  | { type: "SET_SELECTED_STORE"; payload: Store | null };

const initialState: StoreState = {
  stores: [],
  selectedStore: null,
};

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case "SET_STORES":
      return { ...state, stores: action.payload };
    case "SET_SELECTED_STORE":
      return { ...state, selectedStore: action.payload };
    default:
      return state;
  }
};

