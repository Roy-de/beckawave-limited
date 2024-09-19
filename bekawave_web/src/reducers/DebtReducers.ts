import { DebtAction, DebtState } from "@/types/states_and_actions";

export const debtReducer = (
  state: DebtState,
  action: DebtAction,
): DebtState => {
  switch (action.type) {
    case "SET_DEBTS":
      return {
        ...state,
        debt: action.payload,
        message: { type: "success", message: "Debt set successfully" },
      };

    case "ADD_DEBT":
      return {
        ...state,
        debt: [...state.debt, action.payload],
        message: { type: "success", message: "Debt added successfully" },
      };

    case "UPDATE_DEBT":
      return {
        ...state,
        debt: state.debt.map((d) =>
          d.debt_id === action.payload.debt_id ? action.payload : d,
        ),
        message: { type: "success", message: "Debt updated successfully" },
      };

    case "DELETE_DEBT":
      return {
        ...state,
        debt: state.debt.filter((d) => d.debt_id !== action.payload),
        message: { type: "success", message: "Debt deleted successfully" },
      };

    case "PAY_DEBT":
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
        message: {
          type: "success",
          message:
            action.type === "PAY_DEBT"
              ? "Debt paid successfully"
              : "Partial payment made successfully",
        },
      };
    }
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
