import React, { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import {
  BadgeDollarSignIcon,
  BoxesIcon,
  HomeIcon,
  InfoIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon,
  WarehouseIcon,
} from "lucide-react";

const SvgLogo = () => {
  return (
    <div>
      <svg
        fill="none"
        height="30"
        viewBox="0 0 116 139"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.87226 28.7661H0.154358L0 22.3649H50.012V28.6871H42.2169C38.5123 28.6871 33.5729 31.6901 33.5729 40.3042V125.496C33.5729 129.131 36.1969 129.922 41.6766 129.922H76.1756C84.511 129.922 101.588 120.127 109.363 104.949L116 106.213C113.157 123.233 97.3041 137.748 81.7325 138.615C66.1609 139.482 0.077179 138.615 0.077179 138.615V133.004H7.40918C11.8856 133.004 15.976 129.922 15.976 124.785V37.5382C15.976 31.5321 12.2715 28.7661 7.87226 28.7661Z"
          fill="black"
        />
        <path
          d="M9.1843 116.092H0.077179V110.086H6.86893L9.1843 108.742V116.092Z"
          fill="black"
        />
        <path
          d="M33.5729 9.56236V15.0943V15.4894H16.0532V13.1976C16.1134 8.0618 13.2748 5.45292 6.71457 5.45292H0V0H58.1158C85.368 2.72516 96.6631 15.2399 97.1683 26.7114V34.3771C97.4611 40.3859 92.932 48.7788 80.652 55.6355C79.7775 56.0495 80.2254 56.3341 80.652 56.821C97.2661 62.2589 103.024 71.1388 102.648 81.7147V86.5354C101.585 104.574 84.3538 116.207 60.2768 116.092H40.982V107.478C42.6014 108.003 43.2974 108.189 47.6194 108.11C51.9414 108.031 58.4245 108.11 58.4245 108.11C68.5602 107.051 81.1848 99.8346 81.1151 86.5354V83.4533C81.3504 68.682 63.9675 59.9493 52.6361 59.903C41.3046 59.8568 40.996 60.0267 40.982 59.903V52.6325H54.8742C66.6577 51.6921 77.8095 44.8069 78.1823 33.1126V27.8968C77.419 17.4791 64.1783 7.30426 51.4784 6.87541H44.4551C39.67 6.87541 33.5729 7.27055 33.5729 9.56236Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

interface SideNavProps {
  active: string;
  setActive: (name: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ active, setActive }) => {
  const buttons = [
    { id: 1, name: "Home", icon: <HomeIcon size={19} /> },
    { id: 2, name: "Sales", icon: <BadgeDollarSignIcon size={19} /> },
    { id: 3, name: "Customers", icon: <UsersIcon size={19} /> },
    { id: 4, name: "Inventory", icon: <BoxesIcon size={19} /> },
    { id: 5, name: "Stores", icon: <WarehouseIcon size={19} /> },
  ];

  return (
    <div className={"w-[64px] h-full"}>
      <div
        className={`h-full w-full border-slate-300 bg-blue-100 bg-opacity-65 py-4 pt-10 space-y-10 flex flex-col items-center justify-start text-black`}
      >
        <SvgLogo />
        <div className={"bg-slate-300 w-[40px] h-[1px] rounded-full"} />
        <div className="space-y-5 items-center justify-start flex flex-col">
          {buttons.map((button) => (
            <Tooltip
              key={button.id}
              className={"font-bold bg-[#cce2fc] text-blue-500 border-none"}
              content={button.name}
              placement={"right"}
            >
              <Button
                key={button.name}
                // @ts-ignore
                color={active == button.name ? "primary" : "#2b434e"}
                isIconOnly={true}
                variant={active === button.name ? "flat" : "light"}
                onClick={() => setActive(button.name)}
              >
                {button.icon}
              </Button>
            </Tooltip>
          ))}
          <div className={"bg-slate-300 w-[40px] h-[1px] rounded-full"} />
          <div className={"flex flex-col justify-between h-[430px]"}>
            <Tooltip
              className={"font-bold bg-[#cce2fc] text-blue-500 border-none"}
              content={"Help"}
              placement={"right"}
            >
              {/*<Button
                // @ts-ignore
                color={active == "Help" ? "primary" : "#2b434e"}
                isIconOnly={true}
                variant={active === "Help" ? "flat" : "light"}
                onClick={() => setActive("Help")}
              >
                <InfoIcon size={19} />
              </Button>*/}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
