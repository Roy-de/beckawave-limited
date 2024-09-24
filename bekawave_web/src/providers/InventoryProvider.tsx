import React, { useCallback, useReducer } from "react";

import { initialState, InventoryContext } from "@/src/context/InventoryContext";
import { InventoryReducer } from "@/src/reducers/InventoryReducer";

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(InventoryReducer, initialState);
  const fetchInventory = useCallback(async () => {}, []);
  const deleteInventory = useCallback(async () => {}, []);
  const createInventory = useCallback(async () => {}, []);

  return (
    <InventoryContext.Provider
      value={{
        state,
        dispatch,
        fetchInventory,
        deleteInventory,
        createInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
