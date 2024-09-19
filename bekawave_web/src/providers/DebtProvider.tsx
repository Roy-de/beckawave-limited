import React, { useCallback, useReducer } from "react";

import { debtReducer } from "@/src/reducers/DebtReducers";
import { Debt } from "@/types/types";
import { initialState } from "@/src/context/DebtContext";
import { DebtContext } from "@/src/context/DebtContext";

export const DebtProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(debtReducer, initialState);
  const fetchDebts = useCallback(async () => {}, []);
  const createDebts = useCallback(async (debt: Debt) => {}, []);
  const updateDebt = useCallback(async (debt: Debt) => {}, []);
  const deleteDebt = useCallback(async (id: number) => {}, []);

  return (
    <DebtContext.Provider
      value={{
        state,
        dispatch,
        fetchDebts,
        createDebts,
        updateDebt,
        deleteDebt,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
};
