import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Total Debts", value: 400 },
  { label: "Total Cash", value: 600 },
  { label: "Total Mpesa", value: 300 },
];

const Overview = () => {
  return (
    <div
      className={
        "border h-full w-full bg-white rounded-2xl shadow-soft shadow-blue-100 p-4"
      }
    >
      <div className={"text-center pt-4 items-center flex flex-col justify-center"}>
        <span className={"font-baloo px-10 py-1"}>Sales summary</span>
        <PieChart
          colors={["#E3170A", "#06BCC1", "#12263A"]}
          height={300}
          series={[
            {
              data: data,
              innerRadius: 5,
              outerRadius: 90,
              paddingAngle: 5,
              cornerRadius: 10,
              startAngle: 0,
              endAngle: 360,
              cx: 160,
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </div>
    </div>
  );
};

export default Overview;
