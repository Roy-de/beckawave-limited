"use client";
import React, {useState} from 'react';
import {Box, HomeIcon, SearchIcon, SettingsIcon, UserRound} from "lucide-react";

interface ItemsProps {
    icon: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
}

const Items: React.FC<ItemsProps> = ({ icon, isSelected,onClick}) => {
    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center p-2 rounded-xl cursor-pointer ${
                isSelected ? 'bg-blue-500 text-white' : 'hover:bg-slate-200'
            }`}
        >
            <div
                className={`transition-colors duration-200 ${
                    isSelected ? 'text-white' : 'text-black'
                }`}
            >
                {icon}
            </div>
        </div>
    );
};

const BottomNavBar = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (label: string) => {
        setSelected(label);
    };
    return (
        <div
            className="px-6 py-1.5 bg-white fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-2xl border-slate-400 border flex justify-center gap-5 items-center drop-shadow-lg">
            <Items
                icon={<HomeIcon  size={20}/>}
                isSelected={selected === 'Home'}
                onClick={() => handleClick('Home')}
            />
            <Items
                icon={<SearchIcon size={20}/>}
                isSelected={selected === 'Search'}
                onClick={() => handleClick('Search')}
            />
            <Items
                icon={<UserRound  size={20}/>}
                isSelected={selected === 'Customers'}
                onClick={() => handleClick('Customers')}
            />
            <Items
                icon={<Box  size={20}/>}
                isSelected={selected === 'Inventory'}
                onClick={() => handleClick('Inventory')}
            />
            <Items
                icon={<SettingsIcon size={20}/>}
                isSelected={selected === 'Settings'}
                onClick={() => handleClick('Settings')}
            />
        </div>
    );
};

export default BottomNavBar;
