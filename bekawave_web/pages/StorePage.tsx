import React, { useState } from "react";
import { StoreProvider } from "@/src/providers/StoreProvider";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
interface BreadcrumbsProps {
  label: string;
  component: string;
}
const StorePage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("list");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>([
    { label: "Stores", component: "list" },
  ]);
  const handleBreadcrumbClick = ( component: string ) => {
    setActiveComponent(component);

    setBreadcrumbs((prev) =>
      prev.slice(0, prev.findIndex((item) => item.component === component) + 1),
    );
  };

  return (
    <StoreProvider>
      <div className={"h-full w-full grid grid-cols-10 grid-rows-[auto_ifr_auto]"}>
        <div className={"col-start-1 row-start-1 col-span-full h-10 p-6"}>
          <Breadcrumbs>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem
                key={index}
                className={"font-baloo font-bold text-2xl cursor-pointer"}
                onClick={() => handleBreadcrumbClick(breadcrumb.component)}
              >
                {breadcrumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </div>
      </div>
    </StoreProvider>
  );
};

export default StorePage;
