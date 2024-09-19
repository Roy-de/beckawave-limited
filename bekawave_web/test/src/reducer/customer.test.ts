import { customerReducer } from "@/src/reducers/CustomerReducers";
import { CustomerState, CustomerAction } from "@/types/states_and_actions";

describe("customerReducer", () => {
  const initialState: CustomerState = {
    customers: [],
    selectedCustomer: null,
    message: null,
    error: null,
  };

  it("should handle SET_CUSTOMERS", () => {
    const action: CustomerAction = {
      type: "SET_CUSTOMERS",
      payload: [
        {
          customer_id: 1,
          name: "John Doe",
          phone_no: "1234567890",
          location: "New York",
        },
      ],
    };

    const expectedState: CustomerState = {
      ...initialState,
      customers: action.payload,
      message: null,
      error: null,
    };

    const newState = customerReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle ADD_CUSTOMER", () => {
    const action: CustomerAction = {
      type: "ADD_CUSTOMER",
      payload: {
        customer_id: 2,
        name: "Jane Doe",
        phone_no: "0987654321",
        location: "Los Angeles",
      },
    };

    const expectedState: CustomerState = {
      ...initialState,
      customers: [action.payload],
      message: null,
      error: null,
    };

    const newState = customerReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle UPDATE_CUSTOMER", () => {
    const initialStateWithCustomers: CustomerState = {
      ...initialState,
      customers: [
        {
          customer_id: 1,
          name: "John Doe",
          phone_no: "1234567890",
          location: "New York",
        },
        {
          customer_id: 2,
          name: "Jane Doe",
          phone_no: "0987654321",
          location: "Los Angeles",
        },
      ],
    };

    const action: CustomerAction = {
      type: "UPDATE_CUSTOMER",
      payload: {
        customer_id: 1,
        name: "John Smith",
        phone_no: "1234567890",
        location: "New York",
      },
    };

    const expectedState: CustomerState = {
      ...initialStateWithCustomers,
      customers: [
        {
          customer_id: 1,
          name: "John Smith",
          phone_no: "1234567890",
          location: "New York",
        },
        {
          customer_id: 2,
          name: "Jane Doe",
          phone_no: "0987654321",
          location: "Los Angeles",
        },
      ],
      message: null,
      error: null,
    };

    const newState = customerReducer(initialStateWithCustomers, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle DELETE_CUSTOMER", () => {
    const initialStateWithCustomers: CustomerState = {
      ...initialState,
      customers: [
        {
          customer_id: 1,
          name: "John Doe",
          phone_no: "1234567890",
          location: "New York",
        },
        {
          customer_id: 2,
          name: "Jane Doe",
          phone_no: "0987654321",
          location: "Los Angeles",
        },
      ],
    };

    const action: CustomerAction = {
      type: "DELETE_CUSTOMER",
      payload: 1,
    };

    const expectedState: CustomerState = {
      ...initialStateWithCustomers,
      customers: [
        {
          customer_id: 2,
          name: "Jane Doe",
          phone_no: "0987654321",
          location: "Los Angeles",
        },
      ],
      message: null,
      error: null,
    };

    const newState = customerReducer(initialStateWithCustomers, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_MESSAGE", () => {
    const action: CustomerAction = {
      type: "SET_MESSAGE",
      payload: "Operation successful",
    };

    const expectedState: CustomerState = {
      ...initialState,
      message: action.payload,
      error: null,
    };

    const newState = customerReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_ERROR", () => {
    const action: CustomerAction = {
      type: "SET_ERROR",
      payload: "An error occurred",
    };

    const expectedState: CustomerState = {
      ...initialState,
      message: null,
      error: action.payload,
    };

    const newState = customerReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it("should handle CLEAR_NOTIFICATIONS", () => {
    const action: CustomerAction = {
      type: "CLEAR_NOTIFICATIONS",
    };

    const expectedState: CustomerState = {
      ...initialState,
      message: null,
      error: null,
    };

    const newState = customerReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
