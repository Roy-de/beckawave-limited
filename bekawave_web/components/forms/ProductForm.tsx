import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useProduct } from "@/context/ProductContext";
import ProductTable from "@/components/Tables/ProductTable";

const ProductForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const {state, dispatch, createProducts, fetchProducts} = useProduct()
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div className={"bg-slate-900 p-2 shadow-2xl"}>
      <div className="flex flex-row items-center justify-between">
        <button onClick={closeModal}>Close</button>
        <ProductTable />
      </div>
      <div>
        <form className={"flex flex-col gap-4"}>
          <input/>
          <input/>
          <input/>
          <Button variant={"solid"} color={"primary"} className={"font-bold"}>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
