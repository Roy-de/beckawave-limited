import React, { useEffect, useState } from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Image,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ScrollShadow,
} from "@nextui-org/react";
import { EllipsisVerticalIcon } from "lucide-react";

import { useCustomer } from "@/src/context/CustomerContext";
import { Customer } from "@/types/types";

type Breadcrumb = {
  label: string;
  component: string;
};

interface CustomerListProps {
  onNewCustomerClick: () => void;
}
const CustomerList: React.FC<CustomerListProps> = ({ onNewCustomerClick }) => {
  const { dispatch, state, updateCustomer, fetchCustomers, deleteCustomer } =
    useCustomer();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const selectedCustomer = state.selectedCustomer;
  const customerData = state.customers;
  const [editMode, isEditMode] = useState<boolean>(false);

  const [selectedName, setSelectedName] = useState(
    selectedCustomer?.name || "",
  );
  const [selectedLocation, setSelectedLocation] = useState(
    selectedCustomer?.location || "",
  );
  const [selectedPhoneNo, setSelectedPhoneNo] = useState(
    selectedCustomer?.phone_no || "",
  );

  const handleCustomerClick = (customer: Customer) => {
    dispatch({ type: "SET_SELECTED_CUSTOMER", payload: customer });
    isEditMode(false);
    setSelectedName(customer.name);
    setSelectedLocation(customer.location);
    setSelectedPhoneNo(customer.phone_no);
  };

  const handleSave = async () => {
    const trimmedPhoneNo = selectedPhoneNo.trim();

    if (!trimmedPhoneNo.startsWith("07") || trimmedPhoneNo.length !== 10) {
      alert("Phone number must start with '07' and be exactly 10 digits long.");

      return;
    }

    if (selectedName.trim() === "") {
      alert("Customer name cannot be empty.");

      return;
    }

    const updatedCustomer: Customer = {
      customer_id: selectedCustomer?.customer_id || 0,
      name: selectedName,
      phone_no: selectedPhoneNo.trim(),
      location: selectedLocation.trim(),
    };

    try {
      updateCustomer(updatedCustomer);
      dispatch({
        type: "UPDATE_CUSTOMER",
        payload: updatedCustomer,
      });
      isEditMode(false);
    } catch (error) {}
  };

  // @ts-ignore
  return (
    <div className={"h-full w-full flex flex-row space-x-2 text-black"}>
      <div className={"w-[1200px] h-full flex-none"}>
        <div className={"col-start-1 col-span-full p-6"}>
          <Button
            className={""}
            color={"primary"}
            variant={"light"}
            onClick={onNewCustomerClick}
          >
            Add New Customer
          </Button>
        </div>
        <div>
          <ScrollShadow className="" hideScrollBar={true} size={100}>
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
                <TableColumn>Action</TableColumn>
              </TableHeader>

              <TableBody>
                {customerData.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleCustomerClick(item)}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone_no}</TableCell>
                    <TableCell>{item.location}</TableCell>
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
                          <DropdownItem
                            key={"edit"}
                            onClick={() => {
                              handleCustomerClick(item);
                              isEditMode(true);
                            }}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            key={"view"}
                            onClick={() => handleCustomerClick(item)}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            key={"delete"}
                            color="danger"
                            onClick={() => deleteCustomer(item.customer_id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollShadow>
        </div>
      </div>
      <div
        className={
          "flex-1 border rounded-[20px] shadow-soft shadow-blue-100 w-full h-full"
        }
      >
        {selectedCustomer ? (
          <div className={"p-4"}>
            <div className={"flex flex-row space-x-8 items-center py-10"}>
              <Image
                alt={selectedCustomer.name}
                height={80}
                src={`/avatars/${selectedCustomer.name.toUpperCase().at(0)}.png`}
                width={80}
              />
              {!editMode ? (
                <div className={"space-y-1.5"}>
                  <span className={"font-baloo text-2xl text-black font-bold"}>
                    {selectedCustomer.name}
                  </span>
                  <p className={"font-baloo text-sm text-black font-light"}>
                    {selectedCustomer.location}
                  </p>
                  <p className={"font-baloo text-lg text-black font-medium"}>
                    {selectedCustomer.phone_no}
                  </p>
                </div>
              ) : (
                <div className={"flex flex-row items-start justify-between"}>
                  <div className={"flex flex-col"}>
                    <input
                      className={
                        "outline-none focus:outline-none text-2xl text-black font-baloo font-bold"
                      }
                      value={selectedName}
                      onChange={(e) => setSelectedName(e.target.value)}
                    />
                    <input
                      className={
                        "outline-none focus:outline-none text-sm text-black"
                      }
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    />
                    <input
                      className={
                        "outline-none focus:outline-none text-lg font-baloo text-black font-medium w-fit"
                      }
                      value={selectedPhoneNo}
                      onChange={(e) => setSelectedPhoneNo(e.target.value)}
                    />
                  </div>
                  <div className={"flex flex-col space-y-4"}>
                    <Button
                      className={"font-baloo font-bold text-small"}
                      color={"primary"}
                      size={"sm"}
                      variant={"solid"}
                      onClick={() => handleSave()}
                    >
                      Save
                    </Button>
                    <Button
                      className={"font-baloo text-small font-bold"}
                      color={"danger"}
                      size={"sm"}
                      variant={"light"}
                      onClick={() => isEditMode(false)}
                    >
                      Discard
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className={" bg-slate-200 w-full h-[1px]"} />
            <div className="mt-6">
              <h3 className="font-bold text-lg">Transaction History</h3>
              {/* Add logic to fetch and display transaction history here */}
              {/* You could render a table or list of transactions */}
              <p>Transaction data goes here...</p>
            </div>
          </div>
        ) : (
          <div className={"flex flex-col items-center justify-center w-full h-full"}>
            <p className="text-gray-500">No customer selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NewCustomerForm: React.FC<{ onBackClick: () => void }> = ({
  onBackClick,
}) => {
  const { createCustomer } = useCustomer();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState<string>("");
  const [phoneNoValidation, setPhoneNoValidation] = useState<boolean>(false);

  useEffect(() => {
    if (!phoneNo.startsWith("07") || phoneNo.length !== 10) {
      setPhoneNoValidation(true);
    } else {
      setPhoneNoValidation(false);
    }
  }, [phoneNo]);

  const handleSubmit = () => {
    if (phoneNoValidation) {
      return;
    }
    const newCustomer: Customer = {
      customer_id: 0,
      name: firstName + " " + lastName,
      location: location,
      phone_no: phoneNo,
    };

    createCustomer(newCustomer);
    onBackClick();
  };

  // @ts-ignore
  return (
    <div
      className={
        "h-full w-full space-y-4 flex flex-row justify-start text-center items-start px-8 text-black"
      }
    >
      <div className={"space-y-4 flex flex-col text-center items-start"}>
        <span className={"font-baloo text-3xl font-bold py-10 px-4"}>
          New Customer Information
        </span>
        <div className={"flex flex-row space-x-10"}>
          <Input
            className={"w-[300px] h-20"}
            color={"primary"}
            isRequired={true}
            label={"First name"}
            size={"sm"}
            type={"text"}
            value={firstName}
            variant={"underlined"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            className={"w-[300px] h-20"}
            color={"primary"}
            isRequired={true}
            label={"Last name"}
            size={"sm"}
            type={"text"}
            value={lastName}
            variant={"underlined"}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={"flex flex-col text-start"}>
          <Input
            className={"w-[640px] h-20"}
            color={"primary"}
            isRequired={true}
            label={"Phone no"}
            placeholder={"start with 07"}
            size={"sm"}
            type={"text"}
            value={phoneNo}
            variant={"underlined"}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          {phoneNoValidation && (
            <span className="text-red-500 text-xs font-baloo">
              Phone number is invalid.
            </span>
          )}
        </div>
        <Input
          className={"w-[640px] h-20"}
          color={"primary"}
          isRequired={true}
          label={"Location"}
          size={"sm"}
          type={"text"}
          value={location}
          variant={"underlined"}
          onChange={(e) => setLocation(e.target.value)}
        />
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
          src={"/customer_image.png"}
        />
      </div>
    </div>
  );
};

const CustomerPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("list");
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { label: "Customers", component: "list" },
  ]);
  const handleBreadcrumbClick = (component: string) => {
    setActiveComponent(component);

    // Remove any breadcrumbs that come after the clicked one
    setBreadcrumbs((prev) =>
      prev.slice(0, prev.findIndex((item) => item.component === component) + 1),
    );
  };

  const handleNewCustomerClick = () => {
    // Check if "New customer" breadcrumb already exists
    if (!breadcrumbs.some((breadcrumb) => breadcrumb.component === "new")) {
      setBreadcrumbs((prev) => [
        ...prev,
        { label: "New customer", component: "new" },
      ]);
    }

    setActiveComponent("new");
  };

  const handleBackClick = () => {
    setActiveComponent("list");
    setBreadcrumbs((prev) => prev.slice(0, -1));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "list":
        return <CustomerList onNewCustomerClick={handleNewCustomerClick} />;
      case "new":
        return <NewCustomerForm onBackClick={handleBackClick} />;
      default:
        return <CustomerList onNewCustomerClick={handleNewCustomerClick} />;
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-10 grid-rows-[auto_1fr_auto]">
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

export default CustomerPage;
