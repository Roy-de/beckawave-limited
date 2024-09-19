import React, { useCallback, useReducer } from "react";
import axios from "axios";

import { customerReducer } from "@/src/reducers/CustomerReducers";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";
import { Customer } from "@/types/types";
import { initialState, CustomerContext } from "@/src/context/CustomerContext";
import { useNotification } from "../context/NotificationContext";

interface CustomerProviderProps {
  children: React.ReactNode;
}
/**
 * Customer provider component to wrap around parts of the application that needs access to the customer context.
 */
export const CustomerProvider: React.FC<CustomerProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  const { dispatch: notificationDispatch } = useNotification();
  /**
   * Fetches all customers from the backend and dispatches them to the state
   */

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}customers/all`);
      const data: Customer[] = response.data;

      dispatch({ type: "SET_CUSTOMERS", payload: data });
      notificationDispatch({
        type: "SET_MESSAGE",
        payload: "Customers fetched successfully",
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching customers" });
      notificationDispatch({
        type: "SET_ERROR",
        payload: "Error fetching customers",
      });
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

      if (response.status != 200) {
        dispatch({ type: "SET_ERROR", payload: response.data.message });
        notificationDispatch({
          type: "SET_ERROR",
          payload: response.data.message,
        });
      } else {
        dispatch({ type: "ADD_CUSTOMER", payload: data });
        notificationDispatch({
          type: "SET_MESSAGE",
          payload: "Customers created successfully",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error creating customer" });
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
      const data: Customer = response.data;

      dispatch({ type: "UPDATE_CUSTOMER", payload: data });
      dispatch({
        type: "SET_MESSAGE",
        payload: "Customers updated successfully",
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error updating customer" });
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
      dispatch({
        type: "SET_MESSAGE",
        payload: "Customers deleted successfully",
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error deleting customer" });
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
