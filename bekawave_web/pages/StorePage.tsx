import React, { useState } from "react";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";

import { StoreProvider } from "@/src/providers/StoreProvider";
import NewStore from "@/components/forms/NewStore";
interface BreadcrumbsProps {
  label: string;
  component: string;
}

interface StoreListProps {
  onNewStoreClick: () => void;
}
const StoreList: React.FC<StoreListProps> = ({ onNewStoreClick }) => {
  return (
    <div className={"h-full w-full flex flex-row space-x-2 text-black"}>
      <div className={"w-[1200px] h-full flex-none"}>
        <div className={"col-start-1 col-span-full p-6"}>
          <Button
            className={""}
            color={"primary"}
            variant={"light"}
            onClick={onNewStoreClick}
          >
            Add New Store
          </Button>
        </div>
        <div>
          {/*<ScrollShadow className="" hideScrollBar={true} size={100}>
            <Table
              className={"h-[700px]"}
              removeWrapper={true}
              selectionMode={"single"}
            >
              <TableHeader
                className={"sticky top-0 bg-white"}
                style={{ zIndex: 1 }}
              >
                <TableColumn>Customer Name</TableColumn>
                <TableColumn>Phone No</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Debt Amount</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>

              <TableBody>
                {customerData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.phoneNo}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.debtAmount}</TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <button>
                            <EllipsisVerticalIcon size={18} />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu
                          className={"text-black font-baloo"}
                          variant={"flat"}
                        >
                          <DropdownItem key={"edit"}>Edit</DropdownItem>
                          <DropdownItem key={"view"}>View</DropdownItem>
                          <DropdownItem key={"delete"} color="danger">
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>*/}
        </div>
      </div>
      <div
        className={
          "flex-1 border rounded-[20px] shadow-soft shadow-blue-100 w-full h-full"
        }
      >
        Hello
      </div>
    </div>
  );
};

const StorePage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("list");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>([
    { label: "Stores", component: "list" },
  ]);
  const handleBreadcrumbClick = (component: string) => {
    setActiveComponent(component);

    setBreadcrumbs((prev) =>
      prev.slice(0, prev.findIndex((item) => item.component === component) + 1),
    );
  };
  const handleNewStoreClick = () => {
    if (
      !breadcrumbs.some((breadcrumb) => breadcrumb.component === "new-store")
    ) {
      setBreadcrumbs((prev) => [
        ...prev,
        { label: "New Stores", component: "new-store" },
      ]);
    }

    setActiveComponent("new-store");
  };

  const handleBackClick = () => {
    setActiveComponent("list");
    setBreadcrumbs((prev) => prev.slice(0, -1));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "list":
        return <StoreList onNewStoreClick={handleNewStoreClick} />;
      case "new-store":
        return (
          <StoreProvider>
            <NewStore onBackClick={handleBackClick} />
          </StoreProvider>
        );
    }
  };

  return (
    <div
      className={"h-full w-full grid grid-cols-10 grid-rows-[auto_1fr_auto]"}
    >
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
      <div className={"h-full col-start-1 col-span-full p-6"}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default StorePage;
