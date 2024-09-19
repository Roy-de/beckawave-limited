import React, { createContext, useContext } from "react";

import { Customer } from "@/types/types";
import { CustomerAction, CustomerState } from "@/types/states_and_actions";

/**
 * Interface representing the properties provided by the CustomerContext.
 */
export interface CustomerContextProps {
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
export const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  message: null,
  error: null,
};

/**
 * React context to provide and consume customer state and actions.
 */
export const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined,
);

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
