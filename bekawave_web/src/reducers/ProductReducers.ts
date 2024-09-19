import { ProductAction, ProductState } from "@/types/states_and_actions";

export const productReducer = (state: ProductState, action: ProductAction) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, product: action.payload, message: null, error: null };
    case "DELETE_PRODUCT":
      return {
        ...state,
        product: state.product.filter((p) => p.product_id !== action.payload),
        message: null,
        error: null,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        product: [...state.product, action.payload],
        message: null,
        error: null,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: state.product.map((p) =>
          p.product_id === action.payload.product_id ? action.payload : p,
        ),
        message: null,
        error: null,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        message: null,
        error: action.payload,
      };

    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};
