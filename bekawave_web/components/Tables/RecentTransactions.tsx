import React, { useState } from "react";
import { ArrowDownToLineIcon, SearchIcon } from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { mockData } from "@/test/mocks/mockData";

const RecentTransactions = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={
        "h-[800px] w-[1380px] bg-white border rounded-2xl shadow-soft shadow-blue-100 flex flex-col p-4 space-y-4"
      }
    >
      <span
        className={
          "py-2 px-6 font-baloo text-2xl font-bold w-full bg-slate-100 rounded-xl"
        }
      >
        Recent Transactions
      </span>
      <div className={"flex flex-row justify-between"}>
        <div
          className={
            "border w-1/3 h-8 flex flex-row items-center space-x-4 p-2 rounded-md bg-gray-50"
          }
        >
          <SearchIcon color={"#7c7c7c"} size={20} />
          <input
            className={
              "w-full outline-none focus:outline-none placeholder:text-gray-500 bg-gray-50 text-sm"
            }
            placeholder={"search by name"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dropdown showArrow={true}>
          <DropdownTrigger>
            <Button
              className={"font-baloo text-sm"}
              color={"primary"}
              endContent={<ArrowDownToLineIcon size={20} />}
              isLoading={false}
              size={"sm"}
              startContent={"icon"}
              variant={"flat"}
            >
              Export
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className={"h-20 text-black"}>
            <DropdownItem variant={"flat"}>Export as .csv</DropdownItem>
            <DropdownItem variant={"flat"}>Export as .xslx</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <ScrollShadow className="" hideScrollBar={true} size={100}>
        <Table isStriped={true} removeWrapper={true} selectionMode="single">
          <TableHeader
            className={"sticky top-0 bg-white"}
            style={{ zIndex: 1 }}
          >
            <TableColumn>Name</TableColumn>
            <TableColumn>Location</TableColumn>
            <TableColumn>Phone No</TableColumn>
            <TableColumn>Product Count</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Type</TableColumn>
          </TableHeader>
          {filteredData.length === 0 ? (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          ) : (
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>{item.productCount}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </ScrollShadow>
    </div>
  );
};

export default RecentTransactions;
