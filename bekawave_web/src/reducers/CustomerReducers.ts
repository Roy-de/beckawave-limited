import { CustomerAction, CustomerState } from "@/types/states_and_actions";

/**
 * Reducer function to handle state changes based on dispatched actions
 */
export const customerReducer = (
  state: CustomerState,
  action: CustomerAction,
): CustomerState => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
        message: null,
        error: null,
      };
    case "SET_SELECTED_CUSTOMER":
      return { ...state, selectedCustomer: action.payload };
    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload],
        message: null,
        error: null,
      };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((cust) =>
          cust.customer_id === action.payload.customer_id
            ? action.payload
            : cust,
        ),
        message: null,
        error: null,
      };
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(
          (cust) => cust.customer_id !== action.payload,
        ),
        message: null,
        error: null,
      };
    case "SET_MESSAGE":
      return { ...state, message: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, message: null };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, message: null, error: null };
    default:
      return state;
  }
};
