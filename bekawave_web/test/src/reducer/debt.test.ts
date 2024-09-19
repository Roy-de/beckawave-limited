import { DebtAction, DebtState } from "@/types/states_and_actions";
import { debtReducer } from "@/src/reducers/DebtReducers";

describe("DebtReducer", () => {
  const initialState: DebtState = {
    debt: [],
    selectedCustomersDebt: null,
    message: null,
  };

  it("Should handle ADD_DEBT of a customer", () => {
    const action: DebtAction = {
      type: "ADD_DEBT",
      payload: {
        debt_id: 1,
        customer_id: 1,
        amount: 200,
        meansOfPayment: undefined,
        paymentStatus: "UNPAID",
        remainingAmount: 200,
        is_paid: false,
        customer_date: "2022-01-10",
        paid_date: null,
      },
    };

    const newState = debtReducer(initialState, action);

    expect(newState.debt).toHaveLength(1);
    expect(newState.message).toEqual({
      type: "success",
      message: "Debt added successfully",
    });
    expect(newState.debt[0]).toEqual(action.payload);
  });
});
