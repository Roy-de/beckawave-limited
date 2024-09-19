import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "@nextui-org/react";

import { useProduct } from "@/src/context/ProductContext";
import { Product } from "@/types/types";

const NewProduct: React.FC<{ onBackClick: () => void }> = ({ onBackClick }) => {
  const { createProducts } = useProduct();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [priceValidation, setPriceValidation] = useState<boolean>(false);

  useEffect(() => {
    if (price <= 0) {
      setPriceValidation(true);
    } else {
      setPriceValidation(false);
    }
  }, [price]);

  const handleSubmit = () => {
    if (!priceValidation && productName !== undefined) {
      const product: Product = {
        product_id: 0,
        name: productName,
        price: price,
      };

      createProducts(product);
      onBackClick();
    } else {
      alert("Fill in the correct information");
    }
  };

  // @ts-ignore
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
              label={"Product name"}
              name={"Product name"}
              size={"sm"}
              type={"text"}
              value={productName}
              variant={"underlined"}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Input
              className={"w-[640px] h-20"}
              color={"primary"}
              isRequired={true}
              label={"Product price"}
              name={"Price"}
              size={"sm"}
              type={"number"}
              value={price.toString()}
              variant={"underlined"}
              onChange={(e) => setPrice(Number(e.target.value))}
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
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              className={"w-96 font-baloo font-bold"}
              color={"primary"}
              onClick={handleSubmit}
            >
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

export default NewProduct;