import React, { useState } from "react";
import {
  Box,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserRound,
  WalletCards,
} from "lucide-react";
import { Button } from "@nextui-org/react";

interface ItemsProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Items: React.FC<ItemsProps> = ({ icon, label, isSelected, onClick }) => {
  return (
    <Button
      className={`${
        isSelected
          ? "bg-blue-700 text-white shadow-blue-700 text-sm font-bold"
          : "bg-transparent text-black shadow-none"
      }`}
      isIconOnly={false}
      radius="md"
      size="sm"
      variant="shadow"
      onClick={onClick}
    >
      {icon} {label}
    </Button>
  );
};

const BottomNavBar = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelected(label);
  };

  return (
    <div className="fixed bottom-2 bg-white p-2 rounded-2xl left-1/2 transform -translate-x-1/2 flex justify-center gap-5 items-center drop-shadow-lg">
      <Items
        icon={<HomeIcon size={16} />}
        isSelected={selected === "Home"}
        label="Home"
        onClick={() => handleClick("Home")}
      />
      <Items
        icon={<SearchIcon size={16} />}
        isSelected={selected === "Search"}
        label="Search"
        onClick={() => handleClick("Search")}
      />
      <Items
        icon={<UserRound size={16} />}
        isSelected={selected === "Customers"}
        label="Customers"
        onClick={() => handleClick("Customers")}
      />
      <Items
        icon={<Box size={16} />}
        isSelected={selected === "Inventory"}
        label="Inventory"
        onClick={() => handleClick("Inventory")}
      />
      <Items
        icon={<WalletCards size={16} />}
        isSelected={selected === "Wallet"}
        label="Wallet"
        onClick={() => handleClick("Wallet")}
      />
      <Items
        icon={<SettingsIcon size={16} />}
        isSelected={selected === "Settings"}
        label="Settings"
        onClick={() => handleClick("Settings")}
      />
    </div>
  );
};

export default BottomNavBar;
