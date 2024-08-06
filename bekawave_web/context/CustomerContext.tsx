import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import axios from "axios";

import { Customer } from "@/types/types";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";

/**
 * Interface representing the state of the customer context.
 */
interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
}

/**
 * Enum representing the different types of actions that can be dispatched.
 */
type CustomerAction =
  | { type: "SET_CUSTOMERS"; payload: Customer[] }
  | { type: "SET_SELECTED_CUSTOMER"; payload: Customer }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "DELETE_CUSTOMER"; payload: number };

/**
 * Interface representing the properties provided by the CustomerContext.
 */
interface CustomerContextProps {
  state: CustomerState;
  dispatch: React.Dispatch<CustomerAction>;
  fetchCustomers: () => void;
  createCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
}

/**
 * Initial state for the customer context
 */
const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
};

/**
 * Reducer function to handle state changes based on dispatched actions
 */
const customerReducer = (
  state: CustomerState,
  action: CustomerAction,
): CustomerState => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };
    case "SET_SELECTED_CUSTOMER":
      return { ...state, selectedCustomer: action.payload };
    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, action.payload] };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((cust) =>
          cust.customer_id === action.payload.customer_id
            ? action.payload
            : cust,
        ),
      };
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(
          (cust) => cust.customer_id === action.payload,
        ),
      };
    default:
      return state;
  }
};

/**
 * React context to provide and consume customer state and actions.
 */
const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined,
);

/**
 * Customer provider component to wrap around parts of the application that needs access to the customer context.
 */
export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  /**
   * Fetches all customers from the backend and dispatches them to the state
   */

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}customers/all`);
      const data: Customer[] = await response.data;

      dispatch({ type: "SET_CUSTOMERS", payload: data });
    } catch (error) {
      console.error("Error fetching customers: ", error);
    }
  }, []);
  /**
   * Creates a new customer by sending a request to the backend and dispatching the created customer to the state
   * @param customer - The customerObject to be created
   */
  const createCustomer = useCallback(async (customer: Customer) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}customers/create`,
        customer,
      );
      const data: Customer = response.data;

      dispatch({ type: "ADD_CUSTOMER", payload: data });
    } catch (error) {
      console.log("Error creating customer: ", error);
    }
  }, []);

  /**
   * Updates an existing customer by sending a request to the backend and dispatching the updated customer to state
   * @param Customer - This represents the customer object to be updated
   */
  const updateCustomer = useCallback(async (customer: Customer) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}customer/update`,
        customer,
      );

      const data: Customer = await response.data;

      dispatch({ type: "UPDATE_CUSTOMER", payload: data });
    } catch (error) {
      console.error("Error updating customer: ", error);
    }
  }, []);

  /**
   *  Deletes a customer by sending a request to the backend and dispatching the customer ID to be removed from the state.
   *  @param customerId - The ID of the customer to be deleted.
   */
  const deleteCustomer = useCallback(async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}customer/delete/${id}`);
      dispatch({ type: "DELETE_CUSTOMER", payload: id });
    } catch (error) {
      console.error("Error deleting customer: ", error);
    }
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        state,
        dispatch,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
/**
 *     <h1>Summary of the Context and Reducer:</h1>
 *
 *     CustomerState Interface: Defines the structure of the customer state.
 *     CustomerContextProps Interface: Defines the properties and methods provided by the context.
 *     initialState: The initial state of the customer context.
 *     CustomerAction Type: Enum of actions that can be dispatched.
 *     customerReducer Function: Handles state changes based on dispatched actions.
 *     CustomerContext: Context to provide and consume customer state and actions.
 *     CustomerProvider Component: Wraps parts of the application that need access to the customer context.
 *     fetchCustomers, createCustomer, updateCustomer, deleteCustomer: Functions to interact with the backend API and update the context state.
 *     useCustomerContext Hook: Provides a convenient way to use the customer context in components.
 */

export const useCustomer = (): CustomerContextProps => {
  const context = useContext(CustomerContext);

  if (!context)
    throw new Error(
      "useCustomerContext must be used within a customer Provider",
    );

  return context;
};
