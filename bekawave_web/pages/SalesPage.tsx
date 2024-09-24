import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React from "react";
import { FileTextIcon, NotebookPenIcon, PlusIcon } from "lucide-react";

const template = [
  {
    index: 0,
    name: "Blank Template",
    icon: <PlusIcon color={"#2E89FF"} size={40} />,
  },
  {
    index: 1,
    name: "Marurui",
    icon: <NotebookPenIcon color={"#2E89FF"} size={30} />,
  },
  {
    index: 1,
    name: "Kahawa West",
    icon: <NotebookPenIcon color={"#2E89FF"} size={30} />,
  },
];

const recents = [
  {
    index: 0,
    icon: <FileTextIcon />,
    doc_name: "2024-09-24_Sales",
    date: Date.now(),
  }
]

const SalesPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/*TODO Insert breadcrumbs here*/}
      <div className="h-80 border-2 border-slate-100 px-2 flex flex-col items-start justify-center text-center space-y-6">
        <span>Templates</span>
        <div className={"flex items-center justify-start text-center space-x-16"}>
          {template.map((item) => (
            <div key={item.index}>
              <Card className="col-span-12 sm:col-span-4 h-36 w-28 hover:bg-[#F7FAFF] outline-none focus:outline-none shadow-soft shadow-blue-100">
                <CardBody className="shadow-sm hover:bg-[#F7FAFF] flex items-center justify-center space-y-2">
                  {item.icon}
                  <span
                    className={"text-[#2E89FF] font-baloo font-bold text-3xl"}
                  >
                    {item.name === "Blank Template" ? "" : item.name.at(0)}
                  </span>
                </CardBody>
              </Card>
              <span className={"font-baloo text-sm"}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div>
          {recents.map((item) => (
            <div key={item.index}>
              {item.icon}
              <span>{item.doc_name}</span>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
