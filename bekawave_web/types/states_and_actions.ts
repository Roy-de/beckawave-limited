import { Customer, Debt, Message, Product, Stock, Store } from "@/types/types";

/**
 * Store state
 */
export interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  message: string | null;
  error: string | null;
}

/**
 * Store action
 */
export type StoreAction =
  | { type: "SET_STORES"; payload: Store[] }
  | { type: "SET_SELECTED_STORE"; payload: Store | null }
  | { type: "DELETE_STORE"; payload: number }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };

/**
 * Customer State
 */
export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  message: string | null;
  error: string | null;
}

/**
 * Customer Action
 */
export type CustomerAction =
  | { type: "SET_CUSTOMERS"; payload: Customer[] }
  | { type: "SET_SELECTED_CUSTOMER"; payload: Customer }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "UPDATE_CUSTOMER"; payload: Customer }
  | { type: "DELETE_CUSTOMER"; payload: number }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };

/**
 * Debt State
 */
export interface DebtState {
  debt: Debt[];
  selectedCustomersDebt: Debt | null;
  message: Message | null;
}

/**
 * Debt Action
 */
export type DebtAction =
  | { type: "SET_DEBTS"; payload: Debt[] }
  | { type: "SET_SELECTED_DEBT"; payload: Debt }
  | { type: "ADD_DEBT"; payload: Debt }
  | { type: "UPDATE_DEBT"; payload: Debt }
  | { type: "DELETE_DEBT"; payload: number }
  | {
      type: "PAY_DEBT";
      payload: { id: number; amount: number; meansOfPayment?: string };
    }
  | {
      type: "PARTIAL_PAYMENT";
      payload: { id: number; amount: number; meansOfPayment?: string };
    }
  | { type: "SET_MESSAGE"; payload: Message }
  | { type: "CLEAR_NOTIFICATIONS" };

/**
 * Product State
 */
export interface ProductState {
  product: Product[];
  selectedProduct: Product | null;
  message: string | null;
  error: string | null;
}

/**
 * Product Action
 */
export type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };

/**
 * Sales State
 */
export interface SalesState {}

/**
 * Notification State
 */
export interface NotificationState {
  message: string | undefined;
  error: string | undefined;
}

/**
 * Notification Action
 */
export type NotificationAction = {
  type: "SET_MESSAGE" | "SET_ERROR" | "CLEAR_NOTIFICATIONS";
  payload?: string;
};

export interface StockState {
  stock: Stock[];
  selectedStock: Stock | null;
  message: string | undefined;
  error: string | undefined;
}
export type StockAction =
  | { type: "SET_STOCK"; payload: Stock[] }
  | { type: "DELETE_STOCK"; payload: number }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" };
