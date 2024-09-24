import React, { useState, useEffect } from "react";
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";

import { useProduct } from "@/src/context/ProductContext";
import { useStore } from "@/src/context/StoreContext";
import { Stock } from "@/types/types";

const NewInventory: React.FC<{ onBackClick: () => void }> = ({
  onBackClick,
}) => {
  const { fetchProducts, state: productState } = useProduct(); // Get fetchProducts and state from context
  const { fetchStores, state: storeState } = useStore();

  const [loading, setLoading] = useState<boolean>(true); // Handle loading state
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerPiece, setPricePerPiece] = useState<number>(0);

  useEffect(() => {
    const getProductsAndStores = async () => {
      try {
        await Promise.all([fetchProducts(), fetchStores()]);
      } catch (error) {
        // @ts-ignore
        console.error("Error fetching products or stores:", error);
      }
      setLoading(false); // Ensure loading is false after fetching data
    };
    // @ts-ignore
    getProductsAndStores(); // Call the function to fetch products and stores on mount
  }, [fetchProducts, fetchStores]); // Add fetchProducts and fetchStores as dependencies

  // Handle loading and errors
  if (loading) {
    return <div>Loading...</div>;
  }

  if (productState.error || storeState.error) {
    return (
      <div>
        {productState.error && <div>Error: {productState.error}</div>}
        {storeState.error && <div>Error: {storeState.error}</div>}
      </div>
    ); // Display errors if any
  }

  const handleStoreChange = (keys: "all" | Set<React.Key>) => {
    if (keys instanceof Set) {
      const selected = Array.from(keys).pop();

      if (selected) setSelectedStore(Number(selected));
    }
  };

  const handleProductChange = (keys: "all" | Set<React.Key>) => {
    if (keys instanceof Set) {
      const selected = Array.from(keys).pop();

      if (selected) setSelectedProduct(Number(selected));
    }
  };

  const handleSubmit = () => {
    if (
      !selectedStore ||
      !selectedProduct ||
      quantity <= 0 ||
      pricePerPiece <= 0
    ) {
      alert("Please fill all fields with valid data.");

      return;
    }

    const stock: Stock = {
      stock_id: 0, // Assuming this will be generated on the backend
      product_id: selectedProduct,
      store_id: selectedStore,
      quantity: quantity,
      amount: pricePerPiece,
      product_worth: pricePerPiece * quantity,
    };

    console.log("Submitting stock record:", stock);
    // Add your submission logic here
  };

  return (
    <div className="h-full w-full space-y-4 flex flex-row justify-start text-center items-start px-8 text-black">
      <div className="space-y-4 flex flex-row text-center items-start">
        <div className="flex flex-col justify-start items-start space-y-6">
          <span className="font-baloo text-3xl font-bold py-10 px-4">
            New Inventory Record
          </span>
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-around w-fit p-1 space-x-40">
              {/* Store Selection */}
              <Select
                disallowEmptySelection
                required
                aria-label="Choose a store"
                className="w-52 text-black font-baloo"
                color="primary"
                placeholder="Choose a store"
                selectedKeys={
                  selectedStore
                    ? new Set([selectedStore.toString()])
                    : new Set()
                }
                size="lg"
                variant="flat"
                onSelectionChange={handleStoreChange}
              >
                {storeState.stores.map((store) => (
                  <SelectItem
                    key={store.store_id}
                    className="text-black font-baloo"
                    textValue={store.name}
                    value={store.store_id.toString()} // Store ID as value
                  >
                    {store.name} {/* Display store name */}
                  </SelectItem>
                ))}
              </Select>

              {/* Product Selection */}
              <Select
                disallowEmptySelection
                required
                className="w-52 text-black font-baloo"
                color="primary"
                placeholder="Choose a product"
                selectedKeys={
                  selectedProduct
                    ? new Set([selectedProduct.toString()])
                    : new Set()
                }
                size="lg"
                variant="flat"
                onSelectionChange={handleProductChange}
              >
                {productState.product.map((product) => (
                  <SelectItem
                    key={product.product_id}
                    className="text-black font-baloo"
                    textValue={product.name}
                    value={product.product_id.toString()} // Product ID as value
                  >
                    {product.name} {/* Display product name */}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Input for Quantity */}
            <Input
              isRequired
              className="w-[640px] h-20"
              color="primary"
              label="Product Quantity"
              name="Quantity"
              size="sm"
              type="number"
              value={quantity.toString()}
              variant="underlined"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            {/* Input for Price per Piece */}
            <Input
              isRequired
              className="w-[640px] h-20"
              color="primary"
              label="Product Price per piece"
              name="Price"
              size="sm"
              type="number"
              value={pricePerPiece.toString()}
              variant="underlined"
              onChange={(e) => setPricePerPiece(Number(e.target.value))}
            />
          </div>

          <div className="py-6 w-[640px] items-center flex space-x-6 justify-evenly">
            <Button
              className="font-baloo font-bold text-md"
              color="primary"
              size="sm"
              variant="light"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              className="w-96 font-baloo font-bold"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="pl-72">
          <Image
            alt="Inventory"
            //@ts-ignore
            layout="fill"
            objectFit="cover"
            src="/inventory.png"
          />
        </div>
      </div>
    </div>
  );
};

export default NewInventory;
