import React, { useCallback, useReducer } from "react";
import axios from "axios";

import { storeReducer } from "@/src/reducers/StoreReducers";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";
import { Store } from "@/types/types";
import { StoreContext, initialState } from "@/src/context/StoreContext";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const fetchStores = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}stores/get-all`);
      const data = await response.data;

      dispatch({ type: "SET_STORES", payload: data });
      dispatch({ type: "SET_MESSAGE", payload: "Successfully fetched stores" });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching a store",
      });
    }
  }, []);

  const createStore = async (store: Store) => {
    try {
      const response = await axios.post(`${BACKEND_URL}stores/create`, store);
      const createdStore = await response.data;

      dispatch({ type: "SET_SELECTED_STORE", payload: createdStore });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Successfully selected a store",
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error selecting a store",
      });
    }
  };
  const deleteStore = useCallback(async (id: number) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}stores/delete/${id}`);
      const data = await response.data;

      dispatch({ type: "DELETE_STORE", payload: data });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Successfully deleted a store",
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error deleting a store",
      });
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
