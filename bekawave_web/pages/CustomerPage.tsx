import React from "react";
import { Button } from "@nextui-org/react";
import { SendHorizonal } from "lucide-react";

import { useModal } from "@/context/ModalContext";
import CustomerForm from "@/components/forms/CustomerForm";

const CustomerPage = () => {
  const { openModal, closeModal } = useModal();
  const openCustomerFormModal = () => {
    openModal(<CustomerForm closeModal={closeModal} />);
  };

  return (
    <div className={"h-full w-full flex flex-col"}>
      <div className={"h-20"}>
      </div>
      <div className={"overflow-y-scroll px-10 h-[600px] gap-2"}>
        <table className={"w-full flex flex-col"}>
          <thead className={"sticky top-0"}>
          <tr className={"w-full flex justify-between text-white"}>
            <th className={"flex-1 bg-gray-800 p-1.5 rounded-l-lg"}>Name</th>
            <th className="flex-1 bg-gray-800 p-1.5">Phone number</th>
            <th className="flex-1 bg-gray-800 p-1.5 rounded-r-lg">Location</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;
