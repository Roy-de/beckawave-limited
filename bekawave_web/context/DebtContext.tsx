import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { Debt } from "@/types/types";

interface DebtState {
  debt: Debt[];
  selectedCustomersDebt: Debt | null;
}

type DebtAction =
  | { type: "SET_DEBTS"; payload: Debt[] }
  | { type: "SET_SELECTED_DEBT"; payload: Debt }
  | { type: "ADD_DEBT"; payload: Debt }
  | { type: "UPDATE_DEBT"; payload: Debt }
  | { type: "DELETE_DEBT"; payload: number }
  | {
      type: "PAY_DEBT";
      payload: { id: number; amount: number; meansOfPayment?: string };
    }
  | {
      type: "PARTIAL_PAYMENT";
      payload: { id: number; amount: number; meansOfPayment?: string };
    };
const initialState: DebtState = {
  debt: [],
  selectedCustomersDebt: null,
};

const debtReducer = (state: DebtState, action: DebtAction): DebtState => {
  switch (action.type) {
    case "SET_DEBTS":
      return { ...state, debt: action.payload };
    case "ADD_DEBT":
      return { ...state, debt: [...state.debt, action.payload] };
    case "UPDATE_DEBT":
      return {
        ...state,
        debt: state.debt.map((d) =>
          d.debt_id === action.payload.debt_id ? action.payload : d,
        ),
      };
    case "DELETE_DEBT":
      return {
        ...state,
        debt: state.debt.filter((d) => d.debt_id !== action.payload),
      };
    case "PAY_DEBT": {
      const { id, amount, meansOfPayment } = action.payload;

      return {
        ...state,
        debt: state.debt.map((d) => {
          if (d.debt_id === id) {
            const newRemainingAmount = d.remainingAmount - amount;

            return {
              ...d,
              remainingAmount: Math.max(newRemainingAmount, 0),
              paymentStatus:
                newRemainingAmount <= 0 ? "PAID" : "PARTIALLY_PAID",
              meansOfPayment,
            };
          }

          return d;
        }),
      };
    }
    case "PARTIAL_PAYMENT": {
      const { id, amount, meansOfPayment } = action.payload;

      return {
        ...state,
        debt: state.debt.map((d) => {
          if (d.debt_id === id) {
            const newRemainingAmount = d.remainingAmount - amount;

            return {
              ...d,
              remainingAmount: Math.max(newRemainingAmount, 0),
              paymentStatus:
                newRemainingAmount <= 0 ? "PAID" : "PARTIALLY_PAID",
              meansOfPayment,
            };
          }

          return d;
        }),
      };
    }
    default:
      return state;
  }
};

interface DebtContextProps {
  state: DebtState;
  dispatch: React.Dispatch<DebtAction>;
  fetchDebts: () => void;
  createDebts: (debt: Debt) => void;
  updateDebt: (debt: Debt) => void;
  deleteDebt: (id: number) => void;
}
const DebtContext = createContext<DebtContextProps | undefined>(undefined);

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

export const useDebtContext = (): DebtContextProps => {
  const context = useContext(DebtContext);

  if (!context)
    throw new Error("useDebtContext must be used within a debt provider");

  return context;
};
