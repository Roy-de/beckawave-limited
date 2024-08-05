import React from "react";
import { Button } from "@nextui-org/react";
import { SendHorizonal } from "lucide-react";

import { CustomerProvider } from "@/context/CustomerContext";
import { useModal } from "@/context/ModalContext";
import CustomerForm from "@/components/forms/CustomerForm";

const CustomerPage = () => {
  const { openModal } = useModal();
  const openCustomerFormModal = () => {
    openModal(<CustomerForm />, <CustomerProvider>{null}</CustomerProvider>);
  };

  return (
    <CustomerProvider>
      <div className={"h-full w-full flex flex-row"}>
        <div className={"w-full h-28 flex flex-col items-end justify-center"}>
          <Button color={"primary"} onClick={openCustomerFormModal}>
            Create Customer <SendHorizonal />
          </Button>
        </div>
      </div>
    </CustomerProvider>
  );
};

export default CustomerPage;
