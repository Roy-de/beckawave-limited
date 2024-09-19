import React, { useState, useEffect } from "react";
import { Button, Image, Input } from "@nextui-org/react";

import { useProduct } from "@/src/context/ProductContext";

const NewInventory: React.FC = () => {
  const { fetchProducts, state } = useProduct(); // Get fetchProducts and state from context
  const [loading, setLoading] = useState<boolean>(true); // Handle loading state

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts(); // Fetch products from context

      if (products) {
        setLoading(false); // Stop loading once products are fetched
      }
    };

    getProducts(); // Call the function to fetch products on mount
    setLoading(false);
  }, [fetchProducts]); // Add fetchProducts as a dependency

  // Handle loading and errors
  if (loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>; // Display error if any
  }

  return (
    <div
      className={
        "h-full w-full space-y-4 flex flex-row justify-start text-center items-start px-8 text-black"
      }
    >
      <div className={"space-y-4 flex flex-row text-center items-start"}>
        <div className={"flex flex-col justify-start items-start space-y-6"}>
          <span className={"font-baloo text-3xl font-bold py-10 px-4"}>
            New Product Information
          </span>
          <div className={"space-y-6"}>
            <Input
              className={"w-[640px] h-20"}
              color={"primary"}
              isRequired={true}
              label={"Store"}
              name={"Product name"}
              size={"sm"}
              type={"text"}
              variant={"underlined"}
            />
            <Input
              className={"w-[640px] h-20"}
              color={"primary"}
              isRequired={true}
              label={"Product price"}
              name={"Price"}
              size={"sm"}
              type={"number"}
              variant={"underlined"}
            />
          </div>
          <div
            className={
              "py-6 w-[640px] items-center flex space-x-6 justify-evenly"
            }
          >
            <Button
              className={"font-baloo font-bold text-md"}
              color={"primary"}
              size={"sm"}
              variant={"light"}
            >
              Back
            </Button>
            <Button className={"w-96 font-baloo font-bold"} color={"primary"}>
              Submit
            </Button>
          </div>
        </div>
        <div className={"pl-72"}>
          <Image
            alt={"Customer"}
            //@ts-ignore
            layout="fill"
            objectFit="cover"
            src={"/delivery.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default NewInventory;
