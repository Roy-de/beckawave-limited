import { StockAction, StockState } from "@/types/states_and_actions";

export const InventoryReducer = (
  state: StockState,
  action: StockAction,
): StockState => {
  switch (action.type) {
    case "SET_STOCK":
      return {
        ...state,
        error: undefined,
        message: undefined,
        stock: action.payload,
      };
    case "DELETE_STOCK":
      return {
        ...state,
        stock: state.stock.filter((stock) => stock.stock_id !== action.payload),
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, message: undefined, error: undefined };
    case "SET_ERROR":
      return { ...state, message: undefined, error: action.payload };
    default:
      return state;
  }
};
