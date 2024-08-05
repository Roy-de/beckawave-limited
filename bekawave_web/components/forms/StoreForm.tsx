import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";

const StoreForm: React.FC<{
  onSubmit: (store_id: number, name: string, location: string) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [store_id] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(store_id, name, location);
  };

  return (
    <div className="w-96 p-8 bg-slate-900 rounded-2xl flex flex-col space-y-10 items-center justify-between">
      <div className={"flex flex-row items-center justify-between w-full"}>
        <span className={"font-bold text-lg"}>Create store</span>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <form
        className={"flex flex-col space-y-8 w-full"}
        onSubmit={handleSubmit}
      >
        <div className="">
          <input
            className={
              "w-full rounded-md py-2 px-3 outline:none focus:outline-none"
            }
            id="name"
            placeholder={"name"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <input
            className={
              "w-full rounded-md py-2 px-3 outline:none focus:outline-none"
            }
            id="location"
            placeholder={"location"}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <Button
            className={"font-bold w-full"}
            color={"primary"}
            type={"submit"}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
