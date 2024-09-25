import React, { useState } from "react";

import SideNav from "@/components/controls/SideNav";
import DashBoardPage from "@/pages/DashBoardPage";
import CustomerPage from "@/pages/CustomerPage";
import InventoryPage from "@/pages/InventoryPage";
import StorePage from "@/pages/StorePage";
import SalesPage from "@/pages/SalesPage";
import { CustomerProvider } from "@/src/providers/CustomerProvider";

const DashBoard = () => {
  const [active, setActive] = useState<string>("Home");
  const renderContent = () => {
    switch (active) {
      case "Home":
        return <DashBoardPage />;
      case "Sales":
        return <SalesPage />;
      case "Customers":
        return (
          <CustomerProvider>
            <CustomerPage />
          </CustomerProvider>
        );
      case "Inventory":
        return <InventoryPage />;
      case "Stores":
        return <StorePage />;
      default:
        return <DashBoardPage />;
    }
  };

  return (
    <div className={"flex h-screen w-screen"}>
      <SideNav active={active} setActive={setActive} />
      {renderContent()}
    </div>
  );
};

export default DashBoard;
