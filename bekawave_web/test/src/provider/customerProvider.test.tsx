import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { useCustomer } from "@/src/context/CustomerContext";
import { BACKEND_URL } from "@/pages/api/BACKEND_URL";
import { CustomerProvider } from "@/src/providers/CustomerProvider";

const mock = new MockAdapter(axios);

const TestComponent = () => {
  const { fetchCustomers, state } = useCustomer();

  return (
    <div>
      <button onClick={() => fetchCustomers()}>Fetch Customers</button>
      <div data-testid="message">{state.message}</div>
    </div>
  );
};

describe("CustomerProvider Actions", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("fetches customers and updates state", async () => {
    // Mock axios response
    mock
      .onGet(`${BACKEND_URL}customers/all`)
      .reply(200, [{ id: 1, name: "John Doe" }]);

    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>,
    );

    fireEvent.click(screen.getByText(/Fetch Customers/i));

    // Wait for state update and assert
    await waitFor(() => {
      expect(screen.getByTestId("message")).toHaveTextContent(
        "Customers fetched successfully",
      );
    });
  });
});
