import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Store } from "@/types/types";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";

interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
}

type Action =
  | { type: "SET_STORES"; payload: Store[] }
  | { type: "SET_SELECTED_STORE"; payload: Store | null }
  | { type: "DELETE_STORE"; payload: number };

const initialState: StoreState = {
  stores: [],
  selectedStore: null,
};

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
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

const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case "SET_STORES":
      return { ...state, stores: action.payload };
    case "SET_SELECTED_STORE":
      return { ...state, selectedStore: action.payload };
    case "DELETE_STORE":
      return {
        ...state,
        stores: state.stores.filter(
          (store) => store.store_id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

interface StoreProviderProps {
  children: React.ReactNode;
}
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const router = useRouter();

  const fetchStores = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}stores/get-all`);

      if (!response.ok) {
        throw new Error("Failed to fetch stores");
      }
      const data = await response.json();

      dispatch({ type: "SET_STORES", payload: data });
    } catch (error) {
      console.error("Error fetching stores: ", error);
    }
  }, []);

  const createStore = async (store: Store) => {
    try {
      const response = await fetch(`${BACKEND_URL}stores/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });

      if (!response.ok) {
        throw new Error("Error creating new store");
      }
      const createdStore = await response.json();

      dispatch({ type: "SET_SELECTED_STORE", payload: createdStore });
      await router.push(`/stores/${createdStore.id}`);
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };
  const deleteStore = useCallback(async (id: number) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}stores/delete/${id}`);

      if (response.status == 200) {
        dispatch({ type: "DELETE_STORE", payload: id });
      } else {
        throw new Error("Failed to delete store");
      }
    } catch (error) {
      console.error("Error deleting store: ", error);
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{ state, dispatch, fetchStores, createStore, deleteStore }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a store provider");
  }

  return context;
};
