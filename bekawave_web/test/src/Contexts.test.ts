import { renderHook } from "@testing-library/react";

import {
  initialState as debtState,
  useDebtContext,
} from "@/src/context/DebtContext";
import {
  mockCreate,
  MockDebtProvider,
  mockDelete,
  mockDispatch,
  mockFetch,
  mockUpdate,
  MockStoreProvider,
  MockProductProvider,
  MockCustomerProvider,
} from "@/test/mocks/MockProvider";
import {
  useStore,
  initialState as storeState,
} from "@/src/context/StoreContext";
import {
  useProduct,
  initialState as productState,
} from "@/src/context/ProductContext";
import {
  useCustomer,
  initialState as customerState,
} from "@/src/context/CustomerContext";

describe("use Contexts", () => {
  it("provides the debt context when used within a provider", () => {
    const { result } = renderHook(() => useDebtContext(), {
      wrapper: MockDebtProvider,
    });

    expect(result.current.state).toEqual(debtState);
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(result.current.fetchDebts).toBe(mockFetch);
    expect(result.current.createDebts).toBe(mockCreate);
    expect(result.current.updateDebt).toBe(mockUpdate);
    expect(result.current.deleteDebt).toBe(mockDelete);
  });
  it("provides the store context when used within a provider", () => {
    const { result } = renderHook(() => useStore(), {
      wrapper: MockStoreProvider,
    });

    expect(result.current.state).toEqual(storeState);
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(result.current.fetchStores).toBe(mockFetch);
    expect(result.current.createStore).toBe(mockCreate);
    expect(result.current.deleteStore).toBe(mockDelete);
  });
  it("provides the product context when used within a provider", () => {
    const { result } = renderHook(() => useProduct(), {
      wrapper: MockProductProvider,
    });

    expect(result.current.state).toEqual(productState);
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(result.current.fetchProducts).toBe(mockFetch);
    expect(result.current.createProducts).toBe(mockCreate);
    expect(result.current.updateProduct).toBe(mockUpdate);
    expect(result.current.deleteProduct).toBe(mockDelete);
  });
  it("provides the customer context when used within a provider", () => {
    const { result } = renderHook(() => useCustomer(), {
      wrapper: MockCustomerProvider,
    });

    expect(result.current.state).toEqual(customerState);
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(result.current.fetchCustomers).toBe(mockFetch);
    expect(result.current.createCustomer).toBe(mockCreate);
    expect(result.current.updateCustomer).toBe(mockUpdate);
    expect(result.current.deleteCustomer).toBe(mockDelete);
  });
});
