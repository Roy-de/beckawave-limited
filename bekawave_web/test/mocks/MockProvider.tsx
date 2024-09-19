import React from "react";

import { initialState as debt } from "@/src/context/DebtContext";
import { initialState as customer } from "@/src/context/CustomerContext";
import {
  initialState as product,
  ProductContext,
} from "@/src/context/ProductContext";
import {
  initialState as store,
  StoreContext,
} from "@/src/context/StoreContext";
import { DebtContext } from "@/src/context/DebtContext";
import { CustomerContext } from "@/src/context/CustomerContext";

const mockDebtState = debt;
const mockCustomerState = customer;
const mockProductState = product;
const mockStoreState = store;

export const mockDispatch = jest.fn();
export const mockFetch = jest.fn();
export const mockCreate = jest.fn();
export const mockUpdate = jest.fn();
export const mockDelete = jest.fn();

export const MockDebtProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DebtContext.Provider
      value={{
        state: mockDebtState,
        dispatch: mockDispatch,
        fetchDebts: mockFetch,
        createDebts: mockCreate,
        updateDebt: mockUpdate,
        deleteDebt: mockDelete,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
};

export const MockCustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CustomerContext.Provider
      value={{
        state: mockCustomerState,
        dispatch: mockDispatch,
        fetchCustomers: mockFetch,
        createCustomer: mockCreate,
        updateCustomer: mockUpdate,
        deleteCustomer: mockDelete,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const MockProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProductContext.Provider
      value={{
        state: mockProductState,
        dispatch: mockDispatch,
        fetchProducts: mockFetch,
        createProducts: mockCreate,
        updateProduct: mockUpdate,
        deleteProduct: mockDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const MockStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider
      value={{
        state: mockStoreState,
        dispatch: mockDispatch,
        createStore: mockCreate,
        deleteStore: mockDelete,
        fetchStores: mockFetch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
