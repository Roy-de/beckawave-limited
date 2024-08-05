import React from "react";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";

const StockTable = () => {
  return (
    <div className={"h-full w-full flex flex-col"}>
      <div className={"h-20 w-full flex items-center justify-between px-12 py-6"}>
        <span className={"text-lg font-bold"}>Available stock</span>
        <Button className={"font-bold"} color={"success"} variant={"light"}>
          <Plus size={20} />
          New Stock
        </Button>
      </div>
      <table className={"h-full w-full items-start justify-between flex"}>
        <thead className={"w-full"}>
        <tr className="w-full">
          <td>Name</td>
          <td>Location</td>
          <td>Available Stock</td>
        </tr>
        </thead>
      </table>
    </div>

  );
};

export default StockTable;
