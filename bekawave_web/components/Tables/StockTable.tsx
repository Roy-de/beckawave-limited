import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

import StockForm from "@/components/forms/StockForm";
import { useModal } from "@/context/ModalContext";
import ProductForm from "@/components/forms/ProductForm";
import { ProductProvider } from "@/context/ProductContext";

const mockData = [
  { name: "Item 1", location: "Warehouse 1", stock: 100 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
  { name: "Item 2", location: "Warehouse 2", stock: 200 },
  { name: "Item 3", location: "Warehouse 3", stock: 150 },
  { name: "Item 4", location: "Warehouse 4", stock: 50 },
];

const StockTable = () => {
  const { openModal, closeModal } = useModal();

  const handleNewStock = () => {
    return openModal(<StockForm closeModal={closeModal} />);
  };
  const handleNewProduct = () => {
    return openModal(
      <ProductProvider>
        <ProductForm closeModal={closeModal} />
      </ProductProvider>,
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-20 w-full flex items-center justify-between px-12 py-6">
        <span className="text-lg font-bold">Available stock</span>
        <ButtonGroup className={"bg-gray-900 rounded-xl"}>
          <Button
            className="font-bold"
            variant="light"
            onClick={handleNewProduct}
          >
            New Product
          </Button>
          <Button
            className="font-bold"
            variant="light"
            onClick={handleNewStock}
          >
            New Stock
          </Button>
        </ButtonGroup>
      </div>
      <div className="overflow-y-scroll px-10 h-[600px] gap-2">
        <table className="w-full flex flex-col">
          <thead className="sticky top-0">
            <tr className="w-full flex justify-between text-white">
              <th className="flex-1 bg-gray-800 p-1.5 rounded-l-lg">Name</th>
              <th className="flex-1 bg-gray-800 p-1.5">Location</th>
              <th className="flex-1 bg-gray-800 p-1.5 rounded-r-lg">
                Available Stock
              </th>
            </tr>
          </thead>
          <tbody className="w-full pt-4">
            {mockData.map((item, index) => (
              <tr
                key={index}
                className="w-full flex justify-between text-center border-b hover:border-none border-gray-900 hover:bg-slate-900 hover:bg-opacity-50 hover:rounded-lg hover:scale-105 hover:duration-200 hover:transition-transform"
              >
                <td className="flex-1 p-2">{item.name}</td>
                <td className="flex-1 p-2">{item.location}</td>
                <td className="flex-1 p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
