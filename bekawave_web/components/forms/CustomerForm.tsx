import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { SendHorizonal } from "lucide-react";

import { useCustomerContext } from "@/context/CustomerContext";
import { Customer } from "@/types/types";

const CustomerForm = () => {
  const { state, createCustomer, updateCustomer } = useCustomerContext();
  const { selectedCustomer } = state;

  const [customer, setCustomer] = useState<Customer>({
    customer_id: selectedCustomer ? selectedCustomer.customer_id : 0,
    name: selectedCustomer ? selectedCustomer.name : "",
    phone_no: selectedCustomer ? selectedCustomer.phone_no : "",
    location: selectedCustomer ? selectedCustomer.location : "",
  });

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer.customer_id) {
      updateCustomer(customer);
    } else {
      createCustomer(customer);
    }
  };

  return (
    <form className={"flex flex-col w-48 text-black gap-4"} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          required
          id="name"
          name="name"
          type="text"
          value={customer.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone_no">Phone No</label>
        <input
          required
          id="phone_no"
          name="phone_no"
          type="text"
          value={customer.phone_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          required
          id="location"
          name="location"
          type="text"
          value={customer.location}
          onChange={handleChange}
        />
      </div>
      <Button
        className={"font-bold bg-blue-600"}
        color={"primary"}
        type="submit"
        variant={"solid"}
      >
        {customer.customer_id ? "Update" : "Create"} Customer{" "}
        <SendHorizonal size={18} />
      </Button>
    </form>
  );
};

export default CustomerForm;
