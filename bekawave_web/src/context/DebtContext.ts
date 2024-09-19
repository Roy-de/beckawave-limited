import React, { createContext, useContext } from "react";

import { Debt } from "@/types/types";
import { DebtAction, DebtState } from "@/types/states_and_actions";

export const initialState: DebtState = {
  debt: [],
  selectedCustomersDebt: null,
  message: null,
};

interface DebtContextProps {
  state: DebtState;
  dispatch: React.Dispatch<DebtAction>;
  fetchDebts: () => void;
  createDebts: (debt: Debt) => void;
  updateDebt: (debt: Debt) => void;
  deleteDebt: (id: number) => void;
}
export const DebtContext = createContext<DebtContextProps | undefined>(
  undefined,
);

export const useDebtContext = (): DebtContextProps => {
  const context = useContext(DebtContext);

  if (!context)
    throw new Error("useDebtContext must be used within a debt provider");

  return context;
};
