import React, { useState } from "react";
import { Button, Image, Input } from "@nextui-org/react";

import { useStore } from "@/src/context/StoreContext";
import { Store } from "@/types/types";

const NewStore: React.FC<{ onBackClick: () => void }> = ({ onBackClick }) => {
  const { createStore } = useStore();
  const [storeName, setStoreName] = useState<string>("");
  const [storeLocation, setStoreLocation] = useState<string>("");

  const handleSubmit = () => {
    const store: Store = {
      store_id: 0,
      name: storeName,
      location: storeLocation,
    };

    createStore(store).then(() => onBackClick);
  };

  return (
    <div
      className={
        "h-full w-full space-y-4 flex flex-row justify-start text-center items-start px-8 text-black"
      }
    >
      <div className={"space-y-4 flex flex-row text-center items-start"}>
        <div className={"flex flex-col justify-start items-start space-y-6"}>
          <span className={"font-baloo text-3xl font-bold py-10 px-4"}>
            New Store Information
          </span>
          <div className={"space-y-6"}>
            <Input
              className={"w-[640px] h-20"}
              color={"primary"}
              isRequired={true}
              label={"Store Name"}
              name={"Store name"}
              size={"sm"}
              type={"text"}
              value={storeName}
              variant={"underlined"}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <Input
              className={"w-[640px] h-20"}
              color={"primary"}
              isRequired={true}
              label={"Store Location"}
              name={"Store location"}
              size={"sm"}
              type={"text"}
              value={storeLocation}
              variant={"underlined"}
              onChange={(e) => setStoreLocation(e.target.value)}
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
            src={"/store.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default NewStore;
