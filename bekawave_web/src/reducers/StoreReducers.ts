import { StoreAction, StoreState } from "@/types/states_and_actions";

export const storeReducer = (
  state: StoreState,
  action: StoreAction,
): StoreState => {
  switch (action.type) {
    case "SET_STORES":
      return { ...state, stores: action.payload, message: null, error: null };
    case "SET_SELECTED_STORE":
      return {
        ...state,
        selectedStore: action.payload,
        message: null,
        error: null,
      };
    case "DELETE_STORE":
      return {
        ...state,
        stores: state.stores.filter(
          (store) => store.store_id !== action.payload,
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
