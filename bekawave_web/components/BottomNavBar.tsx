import React from "react";
import {
  Box,
  HandCoinsIcon,
  HomeIcon,
  SearchIcon,
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
          ? "bg-blue-600 text-white text-sm font-bold"
          : "bg-transparent text-white text-xs shadow-none"
      }`}
      isIconOnly={false}
      radius="md"
      size="sm"
      onClick={onClick}
    >
      {icon} {label}
    </Button>
  );
};

interface BottomNavBarProps {
  selected: string;
  setSelected: (label: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  selected,
  setSelected,
}) => {
  const handleClick = (label: string) => {
    setSelected(label);
  };

  return (
    <div className="fixed bottom-2 bg-slate-900 border border-slate-800 bg-opacity-65 backdrop-blur-3xl p-1.5 rounded-2xl left-1/2 transform -translate-x-1/2 flex justify-center gap-5 items-center drop-shadow-lg shadow-2xl">
      <Items
        icon={<HomeIcon size={16} />}
        isSelected={selected === "Home"}
        label="Home"
        onClick={() => handleClick("Home")}
      />{/*
      <Items
        icon={<SearchIcon size={16} />}
        isSelected={selected === "Search"}
        label="Search"
        onClick={() => handleClick("Search")}
      />*/}
      <Items
        icon={<UserRound size={16} />}
        isSelected={selected === "Customers"}
        label="Customers"
        onClick={() => handleClick("Customers")}
      />
      <Items
        icon={<HandCoinsIcon size={16} />}
        isSelected={selected === "Sales"}
        label={"Sales"}
        onClick={() => handleClick("Sales")}
      />
      <Items
        icon={<Box size={16} />}
        isSelected={selected === "Inventory"}
        label="Inventory"
        onClick={() => handleClick("Inventory")}
      />
    </div>
  );
};

export default BottomNavBar;
