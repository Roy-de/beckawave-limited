/**
 * Represents a store.
 */
export interface Store {
  store_id: number;
  name: string;
  location: string;
}
/**
 * Represents a customer.
 */
export interface Customer {
  customer_id: number;
  name: string;
  phone_no: string;
  location: string;
}

/**
 * Represents a debt.
 */
export interface Debt {
  debt_id: number;
  customer_id: number;
  amount: number;
  remainingAmount: number;
  paymentStatus: "PAID" | "PARTIALLY_PAID" | "UNPAID";
  customer_date: string; // Debt when the debt was set
  paid_date: string | null;
  is_paid: boolean;
  meansOfPayment?: string | null;
}

/**
 * Represents a product.
 */
export interface Product {
  product_id: number;
  name: string;
  price: number;
}
/**
 * Represents a sale.
 */
export interface Sales {
  sale_id: number;
  customer_id: number;
  sales_pair_id: number;
  sales_rep_id: number;
  total_price: number;
  sales_time: string;
  product_id: number;
  product_quantity: number;
}
/**
 * Represents a sales pair, which consists of two sales representatives.
 */
export interface SalesPair {
  sales_pair_id: number;
  sales_rep_id_one: number;
  sales_rep_id_two: number;
  paired_date: string;
}
/**
 * Represents a sales representative.
 */
export interface SalesRep {
  sales_rep_id: number;
  name: string;
  phone_no: string;
}
/**
 * Represents a stock record.
 */
export interface Stock {
  stock_id: number;
  store_id: number;
  amount: number;
  product_id: number;
  product_name: string;
  quantity: number;
  product_worth: number;
}

/** Success and error messages */
export interface Message {
  type: string | null;
  message: string | null;
}
